import styled from "@emotion/styled";
import { ResponseState, ResponseStateType } from "hooks/useResponseReducer";
import LoadingIndicator from "./LoadingIndicator";

const ResultDisplayer = (props: ResponseState) => {
  if (props.status === ResponseStateType.LOADING) {
    return (
      <>
        <LoadingIndicator />
        <StyledLoadingP>{props.message}</StyledLoadingP>
      </>
    );
  }
  if (props.status === ResponseStateType.REJECTED) {
    return <StyledResultP>{props.message}</StyledResultP>;
  }

  if (props.status === ResponseStateType.RESOLVED) {
    return (
      <StyledResultP>{props.korean + "\n\n" + props.english}</StyledResultP>
    );
  }
  return <></>;
};

const StyledResultP = styled.p`
  margin-top: 1rem;
  white-space: pre-wrap;
  line-height: 1.5;

  box-sizing: border-box;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const StyledLoadingP = styled.p`
  margin: 1rem 0 2rem;
  text-align: center;

  color: #9b9b9b;

  font-weight: 500;
`;

export default ResultDisplayer;
