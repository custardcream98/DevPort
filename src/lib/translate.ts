import { TranslationServiceClient } from "@google-cloud/translate";

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

type Language = "ko" | "en";

const translationClient = new TranslationServiceClient({
  credentials: {
    type: process.env.GOOGLE_TYPE,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
});

const translate = async (text: string, from: Language, to: Language) => {
  const [response] = await translationClient.translateText({
    parent: translationClient.locationPath(
      process.env.GOOGLE_PROJECT_ID!,
      "global",
    ),
    contents: [text],
    mimeType: "text/plain",
    sourceLanguageCode: from,
    targetLanguageCode: to,
  });

  const result = response.translations?.reduce((acc, translation) => {
    acc += translation.translatedText;
    return acc;
  }, "");

  if (!result) {
    throw new Error("No translation result");
  }

  return result;
};

const translateKoToEn = async (text: string) => {
  return await translate(text, "ko", "en");
};

const translateEnToKo = async (text: string) => {
  return await translate(text, "en", "ko");
};

export { translate, translateKoToEn, translateEnToKo };
