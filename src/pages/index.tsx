import { useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import {
  Footer,
  InfoButton,
  Line,
  ResultDisplayer,
  ResumeForm,
  Toolbar,
} from "components";

import useTimer from "hooks/useTimer";
import useResponseReducer, {
  ResponseActionType,
  ResponseStateType,
} from "hooks/useResponseReducer";
import postQuery from "fetch/postQuery";
import { isQueryResultTokenExceedError } from "utils/typeGuards";
import {
  checkIfObjectIsNotEmpty,
  formDataToQueryRequestBody,
} from "utils/objectHelpers";
import testData from "fixture/testData";

import type { ResumeFormRef } from "components";
import type { QueryResolvedResponse } from "types/api";

const TIMER = 60;

export default function Home() {
  const shouldTranslateCheckboxRef = useRef<HTMLInputElement>(null);
  const resumeFormRef = useRef<ResumeFormRef>(null);

  const { timer, isTimerRunning, startTimer, resetTimer } = useTimer(TIMER);
  const { response, responseDispatcher } = useResponseReducer();

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

      const queryData = formDataToQueryRequestBody(
        new FormData(event.currentTarget),
      );

      responseDispatcher({ type: ResponseActionType.LOADING });

      try {
        const objectForEmptyCheck = {
          introduce: queryData.introduce,
          skills: queryData.skills,
          experience: queryData.experience,
          projects: queryData.projects,
        };

        const isNotEmpty = checkIfObjectIsNotEmpty(objectForEmptyCheck);
        if (!isNotEmpty) {
          responseDispatcher({ type: ResponseActionType.NO_INPUT });
          return;
        }

        startTimer();

        const result: QueryResolvedResponse = await postQuery(queryData);

        responseDispatcher({
          type: ResponseActionType.RESOLVED,
          korean: result.response.korean,
          english: result.response.english,
        });
      } catch (error) {
        console.error(error);
        resetTimer();

        if (isQueryResultTokenExceedError(error)) {
          const { tokens, max } = error;
          responseDispatcher({
            type: ResponseActionType.TOKENS_COUNT_EXCEEDED,
            tokens,
            max,
          });
          return;
        }

        responseDispatcher({ type: ResponseActionType.REJECTED });
      }
    },
    [isTimerRunning],
  );

  const handleFillTestData: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    const resumeForm = resumeFormRef.current;

    if (!resumeForm || !shouldTranslateCheckboxRef.current) {
      return;
    }

    resumeForm.introduce = testData.introduce;

    resumeForm.skills = testData.skills;

    resumeForm.experience = testData.experience;

    resumeForm.projects = testData.projects;

    resumeForm.audience = testData.audience;

    shouldTranslateCheckboxRef.current.checked = true;
  };

  return (
    <>
      <Title>
        DEVPORT: 이력서 <span className="line-break">면접 질문 생성기</span>
      </Title>
      <Layout>
        <Toolbar.Wrapper>
          <Toolbar.ShouldTranslateCheckbox
            ref={shouldTranslateCheckboxRef}
            type="checkbox"
            name="shouldTranslate"
            form="resumeForm"
            defaultChecked
          />
          <Toolbar.Saperator />
          <Toolbar.Button type="button" onClick={handleFillTestData}>
            테스트 데이터 입력
          </Toolbar.Button>
        </Toolbar.Wrapper>
        <ResumeForm
          id="resumeForm"
          ref={resumeFormRef}
          handleSubmit={handleSubmit}
        />
        <Line />
        <ResultDisplayer {...response} />
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
    .line-break {
      display: block;
      margin-top: 0.3rem;
    }
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
