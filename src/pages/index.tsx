import { useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { Footer, InfoButton, ResumeForm, Toolbar } from "components";

import useTimer from "hooks/useTimer";
import useResponseTextReducer, {
  ResponseTextActionType,
} from "hooks/useResponseTextReducer";
import postQuery from "fetch/postQuery";
import { isQueryResultTokenExceedError } from "utils/typeGuards";
import { checkIfObjectIsNotEmpty, formDataToQuery } from "utils/objectHelpers";
import testData from "fixture/testData";

import type { ResumeFormRef } from "components";
import type { QueryRequestBody, QueryResolvedResponse } from "types/api";

const TIMER = 60;

export default function Home() {
  const shouldTranslateCheckboxRef = useRef<HTMLInputElement>(null);
  const audienceSelectRef = useRef<HTMLSelectElement>(null);
  const resumeFormRef = useRef<ResumeFormRef>(null);

  const { timer, isTimerRunning, startTimer, resetTimer } = useTimer(TIMER);
  const { responseText, responseTextDispatcher } = useResponseTextReducer();

  useEffect(() => {
    const resumeForm = resumeFormRef.current;
    if (!resumeForm) {
      return;
    }

    if (isTimerRunning) {
      resumeForm.generateButtonDisabled = true;
      resumeForm.generateButtonText = `${timer}초 후에 다시 활성화됩니다.`;
    } else {
      resumeForm.generateButtonDisabled = false;
      resumeForm.generateButtonText = "생성하기";
    }
  }, [timer, isTimerRunning]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isTimerRunning) {
        return;
      }

      const queryData = formDataToQuery(new FormData(event.currentTarget));

      responseTextDispatcher({ type: ResponseTextActionType.LOADING });

      const shouldTranslateCheckbox = shouldTranslateCheckboxRef.current;
      const audienceSelect = audienceSelectRef.current;

      if (!shouldTranslateCheckbox || !audienceSelect) {
        responseTextDispatcher({ type: ResponseTextActionType.REJECTED });
        return;
      }

      try {
        const isNotEmpty = checkIfObjectIsNotEmpty(queryData);
        if (!isNotEmpty) {
          responseTextDispatcher({ type: ResponseTextActionType.NO_INPUT });
          return;
        }

        startTimer();
        const queryBody: QueryRequestBody = {
          ...queryData,
          shouldTranslate: shouldTranslateCheckbox.checked,
          audience: audienceSelect.value,
        };

        const result: QueryResolvedResponse = await postQuery(queryBody);

        responseTextDispatcher({
          type: ResponseTextActionType.RESOLVED,
          response: result.response,
        });
      } catch (error) {
        console.error(error);
        resetTimer();

        if (isQueryResultTokenExceedError(error)) {
          const { tokens, max } = error;
          responseTextDispatcher({
            type: ResponseTextActionType.TOKENS_COUNT_EXCEEDED,
            tokens,
            max,
          });
          return;
        }

        responseTextDispatcher({ type: ResponseTextActionType.REJECTED });
      }
    },
    [isTimerRunning],
  );

  const handleFillTestData: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    const resumeForm = resumeFormRef.current;
    const audienceSelect = audienceSelectRef.current;

    if (!resumeForm || !audienceSelect) {
      return;
    }

    resumeForm.introduce = testData.introduce;

    resumeForm.skills = testData.skills;

    resumeForm.experience = testData.experience;

    resumeForm.projects = testData.projects;

    audienceSelect.value = testData.audience;
  };

  return (
    <>
      <Title>DEVPORT: 이력서 면접 질문 생성기</Title>
      <Layout>
        <Toolbar.Wrapper>
          <Toolbar.ShouldTranslateCheckbox ref={shouldTranslateCheckboxRef} />
          <Toolbar.AudienceSelect ref={audienceSelectRef} />
          <Toolbar.Saperator />
          <Toolbar.Button type="button" onClick={handleFillTestData}>
            테스트 데이터 입력
          </Toolbar.Button>
        </Toolbar.Wrapper>
        <ResumeForm ref={resumeFormRef} handleSubmit={handleSubmit} />
        {responseText && <StyledResultP>{responseText}</StyledResultP>}
      </Layout>
      <Footer />
      <InfoButton />
    </>
  );
}

const Title = styled.h1`
  margin: 2rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;

  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const Layout = styled.main`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledResultP = styled.p`
  margin-top: 1rem;
  white-space: pre-wrap;
  line-height: 1.5;

  box-sizing: border-box;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;
