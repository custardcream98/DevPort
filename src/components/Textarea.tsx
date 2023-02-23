import { forwardRef, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

import useForwardRef from "hooks/useForwardRef";

const MIN_HEIGHT = 200;

type TextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
};

type StyledTextareaProps = {
  textareaHeight: number;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, placeholder, required }, ref) => {
    const textareaRef = useForwardRef<HTMLTextAreaElement>(ref);

    const [textareaHeight, setTextareaHeight] = useState<number>(MIN_HEIGHT);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    const handleMouseDown: React.MouseEventHandler = useCallback((event) => {
      setIsResizing(true);
      event.preventDefault();
    }, []);

    const handleMouseUp = useCallback((event: MouseEvent) => {
      setIsResizing(false);
      event.preventDefault();
    }, []);

    const handleMouseMove = useCallback(
      (event: MouseEvent) => {
        if (!textareaRef) {
          return;
        }
        if (isResizing) {
          const newHeight = event.pageY - textareaRef.current.offsetTop;
          setTextareaHeight(Math.max(newHeight, MIN_HEIGHT));
          event.preventDefault();
        }
      },
      [textareaRef, isResizing],
    );

    useEffect(() => {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [isResizing, textareaHeight]);

    return (
      <>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledTextareaWrapper>
          <StyledTextarea
            id={name}
            ref={textareaRef}
            placeholder={placeholder}
            name={name}
            required={required}
            textareaHeight={textareaHeight}
          />
          <StyledTextareaHandle onMouseDown={handleMouseDown}>
            <span className="sr-only">{label} 입력란 크기 조절 핸들</span>
          </StyledTextareaHandle>
        </StyledTextareaWrapper>
      </>
    );
  },
);

const StyledLabel = styled.label`
  display: block;
  margin: 1rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
const StyledTextareaWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;

  overflow: hidden;
  margin: 0.5rem 0;
`;
const StyledTextareaHandle = styled.button`
  display: block;

  width: 100%;
  height: 10px;
  background-color: #f0f0f0;

  cursor: ns-resize;

  ::before {
    content: "";
    width: 30px;
    height: 3px;
    border-radius: 9999px;
    background-color: #ccc;
    display: block;
    margin: 0 auto;
  }
`;
const StyledTextarea = styled.textarea<StyledTextareaProps>`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  border: none;

  padding: 0.4rem 0.6rem;

  font-size: 1rem;
  resize: none;
  min-height: 200px;
  height: ${({ textareaHeight }) => textareaHeight}px;

  font-family: "sans-serif";
`;

export default Textarea;
