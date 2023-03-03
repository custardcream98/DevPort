import type { ResponseSet } from "types/api";

const resolveResult = (result: string): ResponseSet[] => {
  const results = result.split("\n").filter((line) => line.length > 0);
  const questions = results.filter((line) => !line.startsWith("@#"));
  const tips = results.filter((line) => line.startsWith("@#"));

  const responseSets: ResponseSet[] = questions.map((question) => ({
    question,
  }));

  if (tips.length === 0) {
    return responseSets;
  }

  if (questions.length !== tips.length) {
    throw new Error("Invalid result");
  }

  tips.forEach((tip, index) => {
    responseSets[index].tip = tip ? tip.slice(3) : undefined;
  });

  return responseSets;
};

export { resolveResult };
