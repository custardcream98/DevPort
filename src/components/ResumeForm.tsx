import styled from "@emotion/styled";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Line from "./Line";
import Input from "./Input";
import Textarea from "./Textarea";

import type { ComponentPropsWithoutRef } from "react";
import type { QueryPrompt } from "types/prompt";

type ResumeFormFillData = Required<Omit<QueryPrompt, "shouldGenerateTips">>;

export type ResumeFormRef = {
  fill: (data: ResumeFormFillData) => void;
};

type Props = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
} & ComponentPropsWithoutRef<"form">;

const ResumeForm = forwardRef<ResumeFormRef, Props>(
  ({ handleSubmit, ...props }, ref) => {
    const introduceRef = useRef<HTMLTextAreaElement>(null);
    const skillsRef = useRef<HTMLTextAreaElement>(null);
    const experienceRef = useRef<HTMLTextAreaElement>(null);
    const projectsRef = useRef<HTMLTextAreaElement>(null);
    const audienceInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        fill({
          introduce,
          skills,
          experience,
          projects,
          audience,
        }: ResumeFormFillData) {
          if (
            !audienceInputRef.current ||
            !introduceRef.current ||
            !skillsRef.current ||
            !experienceRef.current ||
            !projectsRef.current
          ) {
            throw new Error("No Element");
          }

          audienceInputRef.current.value = audience;
          introduceRef.current.value = introduce;
          skillsRef.current.value = skills;
          experienceRef.current.value = experience;
          projectsRef.current.value = projects;
        },
      }),
      [],
    );

    return (
      <StyledForm onSubmit={handleSubmit} {...props}>
        <Input
          ref={audienceInputRef}
          type="text"
          name="audience"
          label="직업"
          placeholder="원하는 직업을 적어주세요."
          required
        />
        <Line />
        <Textarea
          ref={introduceRef}
          placeholder="자기소개를 적어주세요. "
          label="자기소개"
          name="introduce"
        />
        <Textarea
          ref={skillsRef}
          placeholder="보유하고 계신 기술을 적어주세요."
          label="보유 기술"
          name="skills"
        />
        <Textarea
          ref={experienceRef}
          placeholder="경력을 적어주세요."
          label="경력"
          name="experience"
        />
        <Textarea
          ref={projectsRef}
          placeholder="경험하신 프로젝트를 적어주세요."
          label="프로젝트"
          name="projects"
        />
      </StyledForm>
    );
  },
);

const StyledForm = styled.form`
  width: 100%;
`;

export default ResumeForm;
