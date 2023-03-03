import { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import FoldIcon from "components/FoldIcon";

import type { ResponseSet } from "types/api";

type Props = ResponseSet & { questionNumber: number };
type StyledFoldIconProps = {
  shouldBeUpside: boolean;
};
type StyledTipPProps = {
  shouldBeFolded: boolean;
};

const ResultItem = ({ question, tip, questionNumber }: Props) => {
  const [isFolded, setIsFolded] = useState(true);

  const handleFoldButtonClick = () => {
    setIsFolded((prev) => !prev);
  };

  return (
    <StyledResultItem>
      <StyledResultItemWrapper>
        <StyledQuestionNumber>{questionNumber}</StyledQuestionNumber>
        <StyledQuestionP>{question}</StyledQuestionP>
        <StyledFoldButton type="button" onClick={handleFoldButtonClick}>
          <StyledFoldIcon
            stroke="teal"
            title="접기"
            width={20}
            height={20}
            lineWidth={3}
            shouldBeUpside={isFolded}
          />
        </StyledFoldButton>
      </StyledResultItemWrapper>
      <StyledTipP shouldBeFolded={isFolded}>{tip}</StyledTipP>
    </StyledResultItem>
  );
};

const StyledFoldButton = styled.button`
  margin-left: auto;
`;
const StyledFoldIcon = styled(FoldIcon)<StyledFoldIconProps>`
  display: inline-block;
  transition: all 0.2s ease-in-out;

  ${({ shouldBeUpside }) =>
    !shouldBeUpside &&
    css`
      transform: rotate(-180deg);
    `};
`;

const StyledTipP = styled.p<StyledTipPProps>`
  white-space: pre-wrap;
  line-height: 1.5;

  height: 0;

  transition: all 0.2s ease-in-out;

  ${({ shouldBeFolded }) =>
    !shouldBeFolded &&
    css`
      border-top: 1px solid #ccc;
      padding: 1rem;
      height: auto;
    `}
`;

const StyledQuestionP = styled.p`
  line-height: 1.5;
  margin-right: 0.3rem;
`;

const StyledResultItem = styled.li`
  margin: 1.5rem 0;
  border-radius: 5px;
  border: 1px solid #ccc;

  overflow: hidden;
`;
const StyledResultItemWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 1rem 1rem 0;
`;
const StyledQuestionNumber = styled.em`
  font-size: 0.9rem;
  font-weight: 900;
  width: 1.8rem;
  height: 100%;
  margin: 0 0.8rem;

  text-align: center;

  color: #838383;
`;

export default ResultItem;
