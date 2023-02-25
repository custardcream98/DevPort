import type { QueryPrompt } from "./prompt";

export type QueryRequestBody = QueryPrompt & {
  shouldTranslate: boolean;
};

export type QueryResolvedResponse = {
  type: "resolved";
  response: string;
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
