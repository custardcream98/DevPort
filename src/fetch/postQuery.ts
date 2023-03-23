import type { QueryRequestBody, QueryResolvedResponse } from "types/api";

const QUERY_API =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_DEPLOYED_GCP_URL + "/query"
    : process.env.NEXT_PUBLIC_DEVLOPMENT_GCP_URL + "/query";

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

  throw await result.json();
};

export default postQuery;
