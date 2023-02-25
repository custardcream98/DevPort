import styled from "@emotion/styled";
import type { ComponentPropsWithoutRef } from "react";

type Props = {
  timer: number;
} & ComponentPropsWithoutRef<"button">;

const TimerButton = ({ timer, children, ...props }: Props) => {
  const isTimerRunning = timer > 0;
  const content = isTimerRunning
    ? `${timer}초 후에 다시 활성화됩니다.`
    : children;

  return (
    <StyledButton disabled={isTimerRunning} {...props}>
      {content}
    </StyledButton>
  );
};

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

export default TimerButton;
