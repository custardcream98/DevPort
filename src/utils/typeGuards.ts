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

const isQueryRequestBody = (value: unknown): value is QueryRequestBody => {
  if (typeof value === "object" && value !== null) {
    if (
      "introduce" in value &&
      "experience" in value &&
      "skills" in value &&
      "projects" in value &&
      "audience" in value &&
      "shouldTranslate" in value
    ) {
      return true;
    }
  }
  return false;
};

export { isString, isQueryResultTokenExceedError, isQueryRequestBody };
