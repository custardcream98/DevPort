import styled from "@emotion/styled";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Textarea from "./Textarea";

export type ResumeFormRef = {
  introduce: string;
  skills: string;
  experience: string;
  projects: string;
  generateButtonDisabled: boolean;
  generateButtonText: string;
};

type Props = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const ResumeForm = forwardRef<ResumeFormRef, Props>(({ handleSubmit }, ref) => {
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const skillsRef = useRef<HTMLTextAreaElement>(null);
  const experienceRef = useRef<HTMLTextAreaElement>(null);
  const projectsRef = useRef<HTMLTextAreaElement>(null);
  const generateButtonRef = useRef<HTMLButtonElement>(null);

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
      set generateButtonDisabled(value: boolean) {
        if (!generateButtonRef.current) {
          throw new Error("No Element");
        }
        generateButtonRef.current.disabled = value;
      },
      set generateButtonText(value: string) {
        if (!generateButtonRef.current) {
          throw new Error("No Element");
        }
        generateButtonRef.current.innerText = value;
      },
    }),
    [],
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Textarea
        ref={introduceRef}
        placeholder="자기소개"
        label="자기소개"
        name="introduce"
        required
      />
      <Textarea
        ref={skillsRef}
        placeholder="보유 기술"
        label="보유 기술"
        name="skills"
        required
      />
      <Textarea
        ref={experienceRef}
        placeholder="경력"
        label="경력"
        name="experience"
        required
      />
      <Textarea
        ref={projectsRef}
        placeholder="프로젝트"
        label="프로젝트"
        name="projects"
        required
      />
      <StyledButton ref={generateButtonRef}>생성하기</StyledButton>
    </StyledForm>
  );
});

const StyledButton = styled.button`
  display: block;
  background-color: teal;
  border-radius: 5px;
  color: white;
  font-weight: 500;

  font-size: 1.5rem;
  margin: 1rem 0 2rem;
  padding: 0.8rem 0;

  width: 100%;

  transition: background-color 0.1s ease-in-out;
  :hover {
    background-color: #007272;
  }

  :disabled {
    background-color: #00808081;
  }
  :disabled:hover {
    background-color: #00808081;
  }
`;
const StyledForm = styled.form`
  width: 100%;
`;

export default ResumeForm;
