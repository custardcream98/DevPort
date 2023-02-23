import styled from "@emotion/styled";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import Label from "./Label";

type InputProps = {
  name: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(function InputForwarded(
  { name, label, ...props },
  ref,
) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput ref={ref} id={name} name={name} {...props} />
    </>
  );
});

const StyledInput = styled.input`
  display: block;
  margin: 0.5rem 0;
  box-sizing: border-box;

  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0.4rem 0.6rem;
  font-size: 1rem;

  width: 100%;

  font-family: "sans-serif";
`;

export default Input;
