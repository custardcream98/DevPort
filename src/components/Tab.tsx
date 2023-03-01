import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ComponentPropsWithoutRef } from "react";

const Wrapper = styled.ul`
  display: flex;
  align-items: center;

  margin-bottom: 0.8rem;

  border-bottom: 2px solid #ccc;
  li {
    margin: 0 30px;
  }
`;

type ButtonProps = StyledTabButtonProps & ComponentPropsWithoutRef<"button">;

const Button = ({ isActive, children, ...props }: ButtonProps) => {
  return (
    <li>
      <StyledTabButton type="button" isActive={isActive} {...props}>
        {children}
      </StyledTabButton>
    </li>
  );
};

type StyledTabButtonProps = {
  isActive: boolean;
};

const StyledTabButton = styled.button<StyledTabButtonProps>`
  color: ${({ isActive }) => (isActive ? "teal" : "#9b9b9b")};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  padding: 0.5rem 0;
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;

  transition: all 0.2s ease-in-out;

  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 2px solid teal;
    `}

  :hover {
    border-bottom: 2px solid teal;
  }
`;

const Tab = {
  Wrapper,
  Button,
};

export default Tab;
