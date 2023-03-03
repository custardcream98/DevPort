import { useMemo } from "react";

import { ResponseState, ResponseStateType } from "hooks/useResponseReducer";
import LoadingResult from "./LoadingResult";
import RejectedResult from "./RejectedResult";
import ResolvedResult from "./ResolvedResult";

import type { ResponseSet } from "types/api";

const resolveQuestion = (set: ResponseSet) => ({
  tip: set.tip?.includes(":") ? set.tip?.split(": ")[1] : set.tip,
  question: set.question.slice(set.question.indexOf(". ") + 2),
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
