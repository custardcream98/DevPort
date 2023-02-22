import { useReducer } from "react";

export enum ResponseTextActionType {
  LOADING = "loading",
  RESOLVED = "resolved",
  REJECTED = "rejected",
  NO_INPUT = "noInput",
  TOKENS_COUNT_EXCEEDED = "tokensCountExceeded",
}
type ResponseTextAction =
  | {
      type: ResponseTextActionType.LOADING;
    }
  | {
      type: ResponseTextActionType.RESOLVED;
      response: string;
    }
  | {
      type: ResponseTextActionType.REJECTED;
      error?: unknown;
    }
  | {
      type: ResponseTextActionType.NO_INPUT;
    }
  | {
      type: ResponseTextActionType.TOKENS_COUNT_EXCEEDED;
      tokens: number;
      max: number;
    };

const responseResucer = (state: string, action: ResponseTextAction): string => {
  switch (action.type) {
    case ResponseTextActionType.LOADING:
      return "질문을 생성하고 있습니다.";
    case ResponseTextActionType.RESOLVED:
      return action.response;
    case ResponseTextActionType.REJECTED:
      return "질문 생성에 실패했습니다.";
    case ResponseTextActionType.NO_INPUT:
      return "이력서 내용이 비어있습니다.";
    case ResponseTextActionType.TOKENS_COUNT_EXCEEDED:
      return `글자 수가 너무 많습니다.\n\n현재 토큰 수: ${action.tokens}\n최대 토큰 수: ${action.max}`;
    default:
      return state;
  }
};

const useResponseTextReducer = () => {
  const [responseText, responseTextDispatcher] = useReducer(
    responseResucer,
    "",
  );

  return { responseText, responseTextDispatcher };
};

export default useResponseTextReducer;
