import { useCallback, useRef } from "react";
import styled from "@emotion/styled";

import {
  Footer,
  InfoModal,
  Line,
  ResultDisplayer,
  ResumeForm,
  TimerButton,
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

const TIMER = 120;

export default function Home() {
  const { response, responseDispatcher } = useResponseReducer();

  const shouldTranslateCheckboxRef = useRef<HTMLInputElement>(null);
  const shouldGenerateTipsCheckboxRef = useRef<HTMLInputElement>(null);
  const resumeFormRef = useRef<ResumeFormRef>(null);

  const { timer } = useTimer({
    maxTime: TIMER,
    startCondition: response.status === ResponseStateType.LOADING,
    resetCondition: response.status === ResponseStateType.REJECTED,
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const queryData = formDataToQueryRequestBody(
        new FormData(event.currentTarget),
      );

      responseDispatcher({ type: ResponseActionType.LOADING });

      const isNotEmpty = checkIfObjectIsNotEmpty({
        introduce: queryData.introduce,
        skills: queryData.skills,
        experience: queryData.experience,
        projects: queryData.projects,
      });
      if (!isNotEmpty) {
        responseDispatcher({ type: ResponseActionType.NO_INPUT });
        return;
      }

      try {
        const {
          response: { korean, english },
        }: QueryResolvedResponse = await postQuery(queryData);

        responseDispatcher({
          type: ResponseActionType.RESOLVED,
          korean,
          english,
        });
      } catch (error) {
        console.error(error);

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
    [],
  );

  const handleFillTestData: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    const resumeForm = resumeFormRef.current;
    const shouldTranslateCheckbox = shouldTranslateCheckboxRef.current;
    const shouldGenerateTipsCheckbox = shouldGenerateTipsCheckboxRef.current;

    if (
      !resumeForm ||
      !shouldTranslateCheckbox ||
      !shouldGenerateTipsCheckbox
    ) {
      return;
    }

    resumeForm.fill(testData);

    shouldTranslateCheckbox.checked = true;
    shouldGenerateTipsCheckbox.checked = true;
  };

  return (
    <>
      <Title>
        DEVPORT: 이력서 <span className="line-break">면접 질문 생성기</span>
      </Title>
      <Layout>
        <Toolbar.Wrapper>
          <Toolbar.Checkbox
            ref={shouldGenerateTipsCheckboxRef}
            type="checkbox"
            name="shouldGenerateTips"
            form="resumeForm"
            defaultChecked
          >
            팁 생성하기
          </Toolbar.Checkbox>
          <Toolbar.Checkbox
            ref={shouldTranslateCheckboxRef}
            type="checkbox"
            name="shouldTranslate"
            form="resumeForm"
            defaultChecked
          >
            영문 번역 거치기
          </Toolbar.Checkbox>
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
        <TimerButton timer={timer} type="submit" form="resumeForm">
          생성하기
        </TimerButton>
        <Line />
        <ResultDisplayer {...response} />
      </Layout>
      <Footer />
      <InfoModal />
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
