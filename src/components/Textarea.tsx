import { forwardRef, useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

import useForwardRef from "hooks/useForwardRef";
import Label from "./Label";

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

    const handleStartResize = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        setIsResizing(true);
        event.preventDefault();
      },
      [],
    );

    const handleEndResize = useCallback((event: MouseEvent | TouchEvent) => {
      setIsResizing(false);
      event.preventDefault();
    }, []);

    const handleResize = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (!textareaRef) {
          return;
        }
        if (isResizing) {
          const pageY =
            event instanceof MouseEvent ? event.pageY : event.touches[0].pageY;

          const newHeight = pageY - textareaRef.current.offsetTop;
          setTextareaHeight(Math.max(newHeight, MIN_HEIGHT));
          event.preventDefault();
        }
      },
      [textareaRef, isResizing],
    );

    useEffect(() => {
      window.addEventListener("mouseup", handleEndResize);
      window.addEventListener("touchend", handleEndResize);
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("touchmove", handleResize);
      return () => {
        window.removeEventListener("mouseup", handleEndResize);
        window.removeEventListener("touchend", handleEndResize);
        window.removeEventListener("mousemove", handleResize);
        window.removeEventListener("touchmove", handleResize);
      };
    }, [handleEndResize, handleResize]);

    return (
      <>
        <Label htmlFor={name}>{label}</Label>
        <StyledTextareaWrapper>
          <StyledTextarea
            id={name}
            ref={textareaRef}
            placeholder={placeholder}
            name={name}
            required={required}
            textareaHeight={textareaHeight}
          />
          <StyledTextareaHandle
            onMouseDown={handleStartResize}
            onTouchStart={handleStartResize}
          >
            <span className="sr-only">{label} 입력란 크기 조절 핸들</span>
          </StyledTextareaHandle>
        </StyledTextareaWrapper>
      </>
    );
  },
);

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
  touch-action: none;

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
