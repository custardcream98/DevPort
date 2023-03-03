import { ResponseState, ResponseStateType } from "hooks/useResponseReducer";
import { useMemo } from "react";
import type { ResponseSet } from "types/api";
import LoadingResult from "./LoadingResult";
import RejectedResult from "./RejectedResult";
import ResolvedResult from "./ResolvedResult";

const resolveQuestion = (set: ResponseSet) => ({
  tip: set.tip?.split(": ")[1],
  question: set.question.split(".")[1],
});

const ResultDisplayer = (props: ResponseState) => {
  if (props.status === ResponseStateType.LOADING) {
    return <LoadingResult message={props.message} />;
  }
  if (props.status === ResponseStateType.REJECTED) {
    return <RejectedResult message={props.message} />;
  }

  if (props.status === ResponseStateType.RESOLVED) {
    const { korean, english } = props;

    const koreanMemo = useMemo(() => korean?.map(resolveQuestion), [korean]);
    const englishMemo = useMemo(() => english?.map(resolveQuestion), [english]);

    return <ResolvedResult korean={koreanMemo} english={englishMemo} />;
  }
  return <></>;
};

export default ResultDisplayer;
