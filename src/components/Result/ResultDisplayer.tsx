import { ResponseState, ResponseStateType } from "hooks/useResponseReducer";
import LoadingResult from "./LoadingResult";
import RejectedResult from "./RejectedResult";
import ResolvedResult from "./ResolvedResult";

const ResultDisplayer = (props: ResponseState) => {
  if (props.status === ResponseStateType.LOADING) {
    return <LoadingResult message={props.message} />;
  }
  if (props.status === ResponseStateType.REJECTED) {
    return <RejectedResult message={props.message} />;
  }

  if (props.status === ResponseStateType.RESOLVED) {
    const { korean, english } = props;

    return <ResolvedResult korean={korean} english={english} />;
  }
  return <></>;
};

export default ResultDisplayer;
