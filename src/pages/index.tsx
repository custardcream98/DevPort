import styled from "@emotion/styled";
import AudienceSelect from "components/AudienceSelect";
import testData from "fixture/testData";
import { useRef, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const shouldTranslateCheckboxRef = useRef<HTMLInputElement>(null);
  const audienceSelectRef = useRef<HTMLSelectElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const skillsRef = useRef<HTMLTextAreaElement>(null);
  const experienceRef = useRef<HTMLTextAreaElement>(null);
  const projectsRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: Record<string, unknown> = {};
    new FormData(event.currentTarget).forEach(
      (value, key) => (data[key] = value),
    );

    setResponse("답변 생성중");

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
  };

  const handleTestDataButton: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    const introduceElement = introduceRef.current;
    const skillsElement = skillsRef.current;
    const experienceElement = experienceRef.current;
    const projectsElement = projectsRef.current;
    const audienceSelectElement = audienceSelectRef.current;

    if (
      !introduceElement ||
      !skillsElement ||
      !experienceElement ||
      !projectsElement ||
      !audienceSelectElement
    ) {
      return;
    }

    introduceElement.value = testData.introduce;

    skillsElement.value = testData.skills;

    experienceElement.value = testData.experience;

    projectsElement.value = testData.projects;

    audienceSelectElement.value = testData.audience;
  };

  return (
    <>
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
      <StyledButton type="button" onClick={handleTestDataButton}>
        테스트 데이터 입력
      </StyledButton>
      <AudienceSelect ref={audienceSelectRef} />
      <form onSubmit={handleSubmit}>
        <textarea ref={introduceRef} placeholder="자기소개" name="introduce" />
        <textarea ref={skillsRef} placeholder="기술" name="skills" />
        <textarea ref={experienceRef} placeholder="경력" name="experience" />
        <textarea ref={projectsRef} placeholder="프로젝트" name="projects" />
        <StyledButton>입력</StyledButton>
      </form>
      <StyledP>{response}</StyledP>
    </>
  );
}

const StyledP = styled.p`
  margin-top: 1rem;
  white-space: pre-wrap;
  line-height: 1.5;
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
