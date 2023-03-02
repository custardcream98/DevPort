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

const Checkbox = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function CheckboxForwarded({ children, ...props }, ref) {
  return (
    <StyledLabel>
      <input ref={ref} {...props} />
      {children}
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

  @media (max-width: 768px) {
    margin-left: auto;
  }
`;

const Toolbar = {
  Wrapper,
  Saperator,
  Checkbox,
  Button,
};

export default Toolbar;
