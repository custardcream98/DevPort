import styled from "@emotion/styled";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  flex-wrap: wrap;

  margin-bottom: 2rem;
`;
const Saperator = styled.div`
  flex: 1;
`;

const ShouldTranslateCheckbox = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function ShouldTranslateCheckboxForwarded(props, ref) {
  return (
    <StyledLabel>
      <input ref={ref} {...props} />
      영문 번역 거치기
    </StyledLabel>
  );
});
const StyledLabel = styled.label`
  word-break: keep-all;
`;

const Button = styled.button`
  display: inline-block;
  background-color: teal;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  color: white;
  font-weight: 500;

  word-break: keep-all;

  transition: background-color 0.1s ease-in-out;
  :hover {
    background-color: #007272;
  }
`;

const Toolbar = {
  Wrapper,
  Saperator,
  ShouldTranslateCheckbox,
  Button,
};

export default Toolbar;
