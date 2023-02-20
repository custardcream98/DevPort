import styled from "@emotion/styled";
import { useCallback, useRef, useState } from "react";

import AudienceSelect from "components/AudienceSelect";
import ResumeForm from "components/ResumeForm";

import testData from "fixture/testData";

import type { ResumeFormRef } from "components/ResumeForm";

export default function Home() {
  const [response, setResponse] = useState("");
  const shouldTranslateCheckboxRef = useRef<HTMLInputElement>(null);
  const audienceSelectRef = useRef<HTMLSelectElement>(null);
  const resumeFormRef = useRef<ResumeFormRef>(null);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: Record<string, unknown> = {};
      new FormData(event.currentTarget).forEach(
        (value, key) => (data[key] = value),
      );

      setResponse("질문을 생성하고 있습니다.");

      try {
        const response = await fetch("/api/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            shouldTranslate: shouldTranslateCheckboxRef.current?.checked,
            audience: audienceSelectRef.current?.value,
          }),
        });

        const result: { response: string } = await response.json();

        setResponse(result.response);
      } catch (error) {
        console.error(error);

        if (typeof error === "object" && error !== null) {
          if (
            "type" in error &&
            error.type === "tokensCountExceeded" &&
            "tokens" in error &&
            "max" in error
          ) {
            setResponse(
              "토큰 수 초과, 현재 토큰 수: " +
                error.tokens +
                ", 최대 토큰 수: " +
                error.max,
            );
            return;
          }
        }

        setResponse("답변 생성 실패");
      }
    },
    [],
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
        <label>
          <input
            ref={shouldTranslateCheckboxRef}
            type="checkbox"
            name="translate"
            id="translate"
            defaultChecked
          />
          영문 번역 거치기
        </label>
        <StyledButton type="button" onClick={handleFillTestData}>
          테스트 데이터 입력
        </StyledButton>
        <AudienceSelect ref={audienceSelectRef} />
        <ResumeForm ref={resumeFormRef} handleSubmit={handleSubmit} />
        {response && <StyledResultP>{response}</StyledResultP>}
      </Layout>
      <Footer>
        <small>&copy; 2023 custardcream98. All rights reserved.</small>
        <address>
          <ul className="address-list">
            <li>
              <a href="https://github.com/custardcream98" target="_blank">
                Github
              </a>
            </li>
            <li>
              <a href="https://custardcream.vercel.app/" target="_blank">
                Blog
              </a>
            </li>
            <li>
              <a href="mailto:custardcream@kakao.com" target="_blank">
                Email
              </a>
            </li>
          </ul>
        </address>
      </Footer>
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
const Footer = styled.footer`
  text-align: center;
  color: #707070;

  .address-list {
    display: flex;
    justify-content: center;
    gap: 0.7rem;

    margin: 0.5rem;

    a {
      transition: all 0.2s ease-in-out;
    }
    a:hover {
      color: #009753;
    }
  }
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
const StyledButton = styled.button`
  display: inline-block;
  background-color: teal;
  margin: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  color: white;
  font-weight: 500;

  cursor: pointer;
`;
