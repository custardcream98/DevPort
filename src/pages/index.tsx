import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";

import { Footer, InfoButton, ResumeForm, Toolbar } from "components";

import testData from "fixture/testData";

import type { ResumeFormRef } from "components";
import type {
  QueryResolvedResponse,
  QueryTokensCountExceededResponse,
} from "types/api";

const isQueryResultTokenExceedError = (
  error: unknown,
): error is QueryTokensCountExceededResponse => {
  if (typeof error === "object" && error !== null) {
    if ("type" in error && error.type === "tokensCountExceeded") {
      return true;
    }
  }
  return false;
};

export default function Home() {
  const [response, setResponse] = useState("");
  const shouldTranslateCheckboxRef = useRef<HTMLInputElement>(null);
  const audienceSelectRef = useRef<HTMLSelectElement>(null);
  const resumeFormRef = useRef<ResumeFormRef>(null);

  const [cooldown, setCooldown] = useState<number>(0);
  const isCooldownRunning = cooldown > 0;

  const updateButtonText = useCallback(() => {
    const resumeForm = resumeFormRef.current;
    if (!resumeForm) {
      return;
    }

    if (isCooldownRunning) {
      resumeForm.generateButtonDisabled = true;
      resumeForm.generateButtonText = `${cooldown}초 후에 다시 활성화됩니다.`;
    } else {
      resumeForm.generateButtonDisabled = false;
      resumeForm.generateButtonText = "생성하기";
    }
  }, [cooldown, isCooldownRunning]);

  useEffect(updateButtonText, [cooldown, isCooldownRunning]);

  useEffect(() => {
    if (isCooldownRunning) {
      const interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCooldownRunning]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isCooldownRunning) {
        return;
      }

      const data: Record<string, unknown> = {};
      new FormData(event.currentTarget).forEach(
        (value, key) => (data[key] = value),
      );

      setResponse("질문을 생성하고 있습니다.");

      const shouldTranslateCheckbox = shouldTranslateCheckboxRef.current;
      const audienceSelect = audienceSelectRef.current;

      if (!shouldTranslateCheckbox || !audienceSelect) {
        setResponse("질문 생성에 실패했습니다.");
        return;
      }

      try {
        const isNotEmpties = Object.values(data).some((value) => value !== "");
        if (!isNotEmpties) {
          setResponse("내용이 비어있습니다.");
          return;
        }

        setCooldown(60);
        const response = await fetch("/api/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            shouldTranslate: shouldTranslateCheckbox.checked,
            audience: audienceSelect.value,
          }),
        });

        const result: QueryResolvedResponse = await response.json();

        setResponse(result.response);
      } catch (error) {
        console.error(error);
        setCooldown(0);

        if (isQueryResultTokenExceedError(error)) {
          const { tokens, max } = error;
          setResponse(
            `글자 수가 너무 많습니다.\n\n현재 토큰 수: ${tokens}\n최대 토큰 수: ${max}`,
          );
          return;
        }

        setResponse("질문 생성에 실패했습니다.");
      }
    },
    [cooldown, isCooldownRunning],
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
        {response && <StyledResultP>{response}</StyledResultP>}
      </Layout>
      <Footer />
      <InfoButton />
    </>
  );
}

const Title = styled.h1`
  margin: 2rem 0 1rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;
const Layout = styled.main`
  padding: 1rem;
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
