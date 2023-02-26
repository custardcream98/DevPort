import type { QueryRequestBody, QueryResolvedResponse } from "types/api";

const QUERY_API =
  process.env.NODE_ENV === "production"
    ? "/api/firebasefunctions/query"
    : "/api/query";

const postQuery = async (
  queryBody: QueryRequestBody,
): Promise<QueryResolvedResponse> => {
  const result = await fetch(QUERY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryBody),
  });

  if (result.ok) {
    return result.json();
  }

  throw new Error("Error while posting query");
};

export default postQuery;
