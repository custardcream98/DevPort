import type { QueryRequestBody, QueryResolvedResponse } from "types/api";

const postQuery = async (
  queryBody: QueryRequestBody,
): Promise<QueryResolvedResponse> => {
  const result = await fetch("/api/query", {
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
