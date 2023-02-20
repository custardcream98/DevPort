import type { NextApiRequest, NextApiResponse } from "next";
import { translateEnToKo, translateKoToEn } from "lib/translate";
import { complete } from "lib/openai";
import { promptTemplate } from "template/prompt";
import { calNumberOfTokens } from "lib/token";

const MAX_TOKENS_FOR_QUERY = 1300;

const isValidBody = <T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[],
): body is T => {
  return Object.keys(body).every((key) => fields.includes(key));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { body } = req;

  if (
    !isValidBody(body, [
      "introduce",
      "experience",
      "skills",
      "projects",
      "shouldTranslate",
      "audience",
    ])
  ) {
    return res.status(400).json({ error: "Invalid body" });
  }

  const { introduce, experience, skills, projects, shouldTranslate, audience } =
    body;

  if (
    typeof audience !== "string" ||
    typeof introduce !== "string" ||
    typeof experience !== "string" ||
    typeof skills !== "string" ||
    typeof projects !== "string" ||
    typeof shouldTranslate !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid body" });
  }

  if (!shouldTranslate) {
    const promptInKr = promptTemplate(
      audience,
      introduce,
      experience,
      skills,
      projects,
    );

    const tokensCount = calNumberOfTokens(promptInKr);
    if (tokensCount > MAX_TOKENS_FOR_QUERY) {
      return res.status(400).json({
        type: "tokensCountExceeded",
        error: "The number of tokens is too large",
        tokens: tokensCount,
        max: MAX_TOKENS_FOR_QUERY,
      });
    }

    try {
      const completion = await complete(promptInKr);

      return res.status(200).json({ response: completion });
    } catch (error) {
      console.warn(error);

      return res.status(500).json({ error });
    }
  }

  const [introduceEng, experienceEng, skillsEng, projectsEng] =
    await Promise.all([
      translateKoToEn(introduce),
      translateKoToEn(experience),
      translateKoToEn(skills),
      translateKoToEn(projects),
    ]);

  const prompt = promptTemplate(
    audience,
    introduceEng,
    experienceEng,
    skillsEng,
    projectsEng,
  );

  const tokensCount = calNumberOfTokens(prompt);
  if (tokensCount > MAX_TOKENS_FOR_QUERY) {
    return res.status(400).json({
      type: "tokensCountExceeded",
      error: "The number of tokens is too large",
      tokens: tokensCount,
      max: MAX_TOKENS_FOR_QUERY,
    });
  }

  try {
    const completion = await complete(prompt);
    const translatedCompletion = await translateEnToKo(completion);

    return res
      .status(200)
      .json({ response: translatedCompletion + "\n\n" + completion });
  } catch (error) {
    console.warn(error);

    return res.status(500).json({ error });
  }
}
