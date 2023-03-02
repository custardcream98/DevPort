import { Configuration, OpenAIApi } from "openai";
import { logOnDev } from "utils/devUtils";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

const MODEL = "gpt-3.5-turbo";

const complete = async (prompt: string) => {
  const completion = await openai.createChatCompletion({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    temperature: 0.9,
    n: 1,
  });

  logOnDev(completion.data);

  const { message } = completion.data.choices[0];

  if (!message) {
    throw new Error("No completion result");
  }

  const { content } = message;

  const result = content.slice(content.indexOf("1."));

  return result;
};

export { complete };
