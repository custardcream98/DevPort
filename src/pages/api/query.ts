import type { NextApiRequest, NextApiResponse } from "next";
import { translateEnToKo, translateKoToEn } from "lib/translate";
import { complete } from "lib/openai";
import { promptTemplate } from "template/prompt";
import { calNumberOfTokens } from "lib/token";
import type { QueryRequestBody, QueryResponse } from "types/api";

const MAX_TOKENS_FOR_QUERY = 3300;

const REQUEST_BODY_KEY_LIST = [
  "introduce",
  "experience",
  "skills",
  "projects",
  "shouldTranslate",
  "audience",
];

const isValidBody = (body: any): body is QueryRequestBody => {
  return Object.keys(body).every((key) => {
    if (REQUEST_BODY_KEY_LIST.includes(key)) {
      if (
        typeof body[key] === "string" ||
        (typeof body[key] === "boolean" && key === "shouldTranslate")
      )
        return true;
    }
    return false;
  });
};

const translateKoToEnIfExist = async (text?: string) => {
  if (text) {
    return await translateKoToEn(text);
  }
  return text;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse>,
) {
  if (process.env.NODE_ENV !== "development") {
    return res
      .status(400)
      .json({ type: "rejected", error: "Not Allowed For Production" });
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ type: "rejected", error: "Method Not Allowed" });
  }

  const { body } = req;

  if (!isValidBody(body)) {
    return res.status(400).json({ type: "rejected", error: "Invalid body" });
  }

  const { introduce, experience, skills, projects, shouldTranslate, audience } =
    body;

  if (!shouldTranslate) {
    const promptInKr = promptTemplate({
      audience,
      introduce,
      experience,
      skills,
      projects,
    });

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

      return res.status(200).json({
        type: "resolved",
        response: { korean: completion, english: "" },
      });
    } catch (error) {
      console.warn(error);

      return res.status(500).json({ type: "rejected", error });
    }
  }

  const [audienceEng, introduceEng, experienceEng, skillsEng, projectsEng] =
    await Promise.all([
      translateKoToEn(audience),
      translateKoToEnIfExist(introduce),
      translateKoToEnIfExist(experience),
      translateKoToEnIfExist(skills),
      translateKoToEnIfExist(projects),
    ]);

  const prompt = promptTemplate({
    audience: audienceEng,
    introduce: introduceEng,
    experience: experienceEng,
    skills: skillsEng,
    projects: projectsEng,
  });

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

    return res.status(200).json({
      type: "resolved",
      response: { korean: translatedCompletion, english: completion },
    });
  } catch (error) {
    console.warn(error);

    return res.status(500).json({ type: "rejected", error });
  }
}
