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
        <StyledButton type="button" onClick={handleTestDataButton}>
          테스트 데이터 입력
        </StyledButton>
        <AudienceSelect ref={audienceSelectRef} />
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel htmlFor="introduce">자기소개</StyledLabel>
          <StyledTextArea
            id="introduce"
            ref={introduceRef}
            placeholder="자기소개"
            name="introduce"
          />
          <StyledLabel htmlFor="skills">기술</StyledLabel>
          <StyledTextArea
            id="skills"
            ref={skillsRef}
            placeholder="기술"
            name="skills"
          />
          <StyledLabel htmlFor="experience">경력</StyledLabel>
          <StyledTextArea
            id="experience"
            ref={experienceRef}
            placeholder="경력"
            name="experience"
          />
          <StyledLabel htmlFor="projects">프로젝트</StyledLabel>
          <StyledTextArea
            id="projects"
            ref={projectsRef}
            placeholder="프로젝트"
            name="projects"
          />
          <StyledBigButton>생성하기</StyledBigButton>
        </StyledForm>
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
const StyledBigButton = styled(StyledButton)`
  font-size: 1.5rem;
  width: 100%;
  margin: 1rem 0 2rem;
  padding: 0.8rem 0;
`;
const StyledForm = styled.form`
  width: 100%;
`;
const StyledLabel = styled.label`
  display: block;
  margin: 1rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
`;
