import { Configuration, OpenAIApi } from "openai";

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

const complete = async (prompt: string) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.9,
    stream: false,
    max_tokens: 2000,
    n: 1,
  });

  const { text: result } = completion.data.choices[0];

  if (!result) {
    throw new Error("No completion result");
  }
  return result;
};

export { complete };
