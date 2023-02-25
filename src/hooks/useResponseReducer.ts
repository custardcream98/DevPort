import { useReducer } from "react";
import type { ResponseWithTranslated } from "types/api";

export enum ResponseActionType {
  LOADING,
  RESOLVED,
  REJECTED,
  NO_INPUT,
  TOKENS_COUNT_EXCEEDED,
}
export enum ResponseStateType {
  INITIAL,
  LOADING,
  RESOLVED,
  REJECTED,
}
type ResponseAction =
  | {
      type: ResponseActionType.LOADING;
    }
  | ({
      type: ResponseActionType.RESOLVED;
    } & Partial<ResponseWithTranslated>)
  | {
      type: ResponseActionType.REJECTED;
      error?: unknown;
    }
  | {
      type: ResponseActionType.NO_INPUT;
    }
  | {
      type: ResponseActionType.TOKENS_COUNT_EXCEEDED;
      tokens: number;
      max: number;
    };
export type ResponseState =
  | {
      status: ResponseStateType.INITIAL;
    }
  | {
      status: ResponseStateType.LOADING;
      message: string;
    }
  | ({
      status: ResponseStateType.RESOLVED;
    } & Partial<ResponseWithTranslated>)
  | {
      status: ResponseStateType.REJECTED;
      message: string;
    };

const responseReducer = (
  _: ResponseState,
  action: ResponseAction,
): ResponseState => {
  switch (action.type) {
    case ResponseActionType.LOADING:
      return {
        status: ResponseStateType.LOADING,
        message: "질문을 생성하고 있습니다.",
      };
    case ResponseActionType.RESOLVED:
      return {
        status: ResponseStateType.RESOLVED,
        korean: action.korean,
        english: action.english,
      };
    case ResponseActionType.REJECTED:
      return {
        status: ResponseStateType.REJECTED,
        message: "질문 생성에 실패했습니다.",
      };
    case ResponseActionType.NO_INPUT:
      return {
        status: ResponseStateType.REJECTED,
        message: "이력서 내용이 비어있습니다.",
      };
    case ResponseActionType.TOKENS_COUNT_EXCEEDED:
      return {
        status: ResponseStateType.REJECTED,
        message: `질문 생성에 실패했습니다. 토큰의 개수가 너무 많습니다. (현재: ${action.tokens}, 최대: ${action.max})`,
      };
    default:
      throw new Error("Unhandled action");
  }
};

const useResponseReducer = () => {
  const [response, responseDispatcher] = useReducer(responseReducer, {
    status: ResponseStateType.INITIAL,
  });

  return { response, responseDispatcher };
};

export default useResponseReducer;
