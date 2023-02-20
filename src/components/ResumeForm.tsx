import styled from "@emotion/styled";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type ResumeFormRef = {
  introduce: string;
  skills: string;
  experience: string;
  projects: string;
};

type Props = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const ResumeForm = forwardRef<ResumeFormRef, Props>(({ handleSubmit }, ref) => {
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const skillsRef = useRef<HTMLTextAreaElement>(null);
  const experienceRef = useRef<HTMLTextAreaElement>(null);
  const projectsRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      set introduce(value: string) {
        if (!introduceRef.current) {
          throw new Error("No Element");
        }
        introduceRef.current.value = value;
      },
      set skills(value: string) {
        if (!skillsRef.current) {
          throw new Error("No Element");
        }
        skillsRef.current.value = value;
      },
      set experience(value: string) {
        if (!experienceRef.current) {
          throw new Error("No Element");
        }
        experienceRef.current.value = value;
      },
      set projects(value: string) {
        if (!projectsRef.current) {
          throw new Error("No Element");
        }
        projectsRef.current.value = value;
      },
    }),
    [],
  );

  return (
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
      <StyledButton>생성하기</StyledButton>
    </StyledForm>
  );
});

const StyledButton = styled.button`
  display: block;
  background-color: teal;
  border-radius: 5px;
  color: white;
  font-weight: 500;

  cursor: pointer;

  font-size: 1.5rem;
  margin: 1rem 0 2rem;
  padding: 0.8rem 0;

  width: 100%;
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

export default ResumeForm;
