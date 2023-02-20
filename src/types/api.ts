export type QueryRequestBody = {
  introduce: string;
  experience: string;
  skills: string;
  projects: string;
  shouldTranslate: boolean;
  audience: string;
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
