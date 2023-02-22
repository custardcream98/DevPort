import { isQuery, isString } from "./typeGuards";

const formDataToObject = (formData: FormData) => {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (isString(value)) return (data[key] = value);
  });
  return data;
};

const formDataToQuery = (formData: FormData) => {
  const queryData = formDataToObject(formData);

  if (isQuery(queryData)) return queryData;

  throw new Error("formDataToQuery: formData is not a query");
};

const checkIfObjectIsNotEmpty = (obj: Record<string, unknown>) => {
  return Object.values(obj).some((value) => !!value);
};

export { formDataToObject, checkIfObjectIsNotEmpty, formDataToQuery };
