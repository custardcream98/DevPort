import { TranslationServiceClient } from "@google-cloud/translate";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { encode } from "gpt-3-encoder";

type RequestBody = {
  introduce: string;
  experience: string;
  skills: string;
  projects: string;
};

const isValidBody = <T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[],
): body is T => {
  return Object.keys(body).every((key) => fields.includes(key));
};

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

if (
  !process.env.GOOGLE_TYPE ||
  !process.env.GOOGLE_PROJECT_ID ||
  !process.env.GOOGLE_PRIVATE_KEY_ID ||
  !process.env.GOOGLE_PRIVATE_KEY ||
  !process.env.GOOGLE_CLIENT_EMAIL ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_AUTH_URI ||
  !process.env.GOOGLE_TOKEN_URI ||
  !process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL ||
  !process.env.GOOGLE_CLIENT_X509_CERT_URL
) {
  throw new Error("GOOGLE_CREDENTIALS is not set");
}

const translationClient = new TranslationServiceClient({
  credentials: {
    type: process.env.GOOGLE_TYPE,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
});

const promptTemplate = (
  audience: string,
) => `Present as many questions as possible with a resume consisted of the four items(Introduce, Experience, Skills, Projects) below. Consider that grammer can be awkward. And stick to the options below.
---
- Format : Markdown
- Question Topic : Resume
- Question Difficulty : Hard
- Question Quantity : 20 ~ 40
- Question Audience : ${audience}
- Question Purpose : Job Interview
---
`;

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

  if (typeof audience !== "string") {
    return res.status(400).json({ error: "Invalid body" });
  }
  const promptInKr = `${promptTemplate(
    audience,
  )}\n1.Introduce: ${introduce}\n2.Experience: ${experience}\n3.Skills: ${skills}\n4.Projects: ${projects}`;

  if (!shouldTranslate) {
    if (!promptInKr) return res.status(500).json({ error: "No response" });

    const encoded = encode(promptInKr);
    console.log(encoded.length);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptInKr,
      temperature: 0.9,
      stream: false,
      max_tokens: 2000,
      n: 1,
    });

    const { data } = completion;
    console.log(data);

    if (!data.choices[0].text) {
      return res.status(500).json({ error: "No response" });
    }

    return res.status(200).json({ response: data.choices[0].text });
  }

  const [response] = await translationClient.translateText({
    parent: translationClient.locationPath(
      process.env.GOOGLE_PROJECT_ID!,
      "global",
    ),
    contents: [promptInKr],
    mimeType: "text/plain",
    sourceLanguageCode: "ko",
    targetLanguageCode: "en",
  });

  const prompt = response.translations?.reduce((acc, translation) => {
    acc += translation.translatedText;
    return acc;
  }, "");

  console.log(prompt);

  if (!prompt) return res.status(500).json({ error: "No response" });

  const encoded = encode(prompt);
  console.log(encoded.length);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      top_p: 1,
      stream: false,
      max_tokens: 2000,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const { data } = completion;
    console.log(data);

    if (!data.choices[0].text) {
      return res.status(500).json({ error: "No response" });
    }
    const [result] = await translationClient.translateText({
      parent: translationClient.locationPath(
        process.env.GOOGLE_PROJECT_ID!,
        "global",
      ),
      contents: [data.choices[0].text],
      mimeType: "text/plain",
      sourceLanguageCode: "en",
      targetLanguageCode: "ko",
    });

    const translatedResult = result.translations?.reduce((acc, translation) => {
      acc += translation.translatedText;
      return acc;
    }, "");

    res.status(200).json({ response: translatedResult + data.choices[0].text });
  } catch (error) {
    console.warn(error);

    if (typeof error === "object" && error !== null) {
      if ("message" in error) res.status(500).json({ error: error.message });
    }
  }
}
