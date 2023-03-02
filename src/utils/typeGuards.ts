import type {
  QueryRequestBody,
  QueryTokensCountExceededResponse,
} from "types/api";

const isString = (value: unknown): value is string => typeof value === "string";

const isQueryResultTokenExceedError = (
  error: unknown,
): error is QueryTokensCountExceededResponse => {
  if (typeof error === "object" && error !== null) {
    if ("type" in error && error.type === "tokensCountExceeded") {
      return true;
    }
  }
  return false;
};

const REQUEST_BODY_KEY_LIST = [
  "introduce",
  "experience",
  "skills",
  "projects",
  "shouldTranslate",
  "audience",
  "shouldGenerateTips",
];

const isQueryRequestBody = (value: unknown): value is QueryRequestBody => {
  if (typeof value === "object" && value !== null) {
    const keys = Object.keys(value);
    if (
      "shouldTranslate" in value &&
      "audience" in value &&
      keys.every((key) => REQUEST_BODY_KEY_LIST.includes(key))
    ) {
      return true;
    }
  }
  return false;
};

export { isString, isQueryResultTokenExceedError, isQueryRequestBody };
