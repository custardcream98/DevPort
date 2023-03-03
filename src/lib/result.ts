import type { ResponseSet } from "types/api";

const resolveResult = (result: string): ResponseSet[] => {
  const results = result.split("\n").filter((line) => line.length > 0);
  const questions = results.filter((line) => !line.startsWith("@#"));
  const tips = results.filter((line) => line.startsWith("@#"));

  if (questions.length !== tips.length) {
    throw new Error("Invalid result");
  }

  const responseSets: ResponseSet[] = [];

  questions.forEach((question, index) => {
    const tip = tips[index];
    responseSets.push({
      question,
      tip: tip ? tip.slice(3) : undefined,
    });
  });

  return responseSets;
};

export { resolveResult };
