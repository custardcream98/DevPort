import { isQueryRequestBody, isString } from "./typeGuards";

const formDataToObject = (formData: FormData) => {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (isString(value)) return (data[key] = value);
  });
  return data;
};

const formDataToQueryRequestBody = (formData: FormData) => {
  const queryData = formDataToObject(formData);

  const queryBody = {
    audience: queryData.audience,
    introduce:
      queryData["introduce-checkbox"] === "on"
        ? queryData.introduce
        : undefined,
    experience:
      queryData["experience-checkbox"] === "on"
        ? queryData.experience
        : undefined,
    skills:
      queryData["skills-checkbox"] === "on" ? queryData.skills : undefined,
    projects:
      queryData["projects-checkbox"] === "on" ? queryData.projects : undefined,
    shouldTranslate: queryData.shouldTranslate === "on",
  };

  if (isQueryRequestBody(queryBody)) return queryBody;

  throw new Error("formDataToQuery: formData is not a query");
};

const checkIfObjectIsNotEmpty = (obj: Record<string, unknown>) => {
  return Object.values(obj).some((value) => !!value);
};

export {
  formDataToObject,
  checkIfObjectIsNotEmpty,
  formDataToQueryRequestBody,
};
