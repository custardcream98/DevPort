import type { QueryPrompt } from "./prompt";

export type QueryRequestBody = QueryPrompt & {
  shouldTranslate: boolean;
};

export type ResponseWithTranslated = { korean: string; english: string };

export type QueryResolvedResponse = {
  type: "resolved";
  response: ResponseWithTranslated;
};
type QueryRejectedResponse = {
  type: "rejected";
  error: unknown;
};
export type QueryTokensCountExceededResponse = {
  type: "tokensCountExceeded";
  error: string;
  tokens: number;
  max: number;
};
export type QueryResponse =
  | QueryResolvedResponse
  | QueryRejectedResponse
  | QueryTokensCountExceededResponse;
