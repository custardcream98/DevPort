// import { Configuration, OpenAIApi } from "openai";
// import { logOnDev } from "utils/devUtils";

// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   }),
// );

// const MODEL = "gpt-3.5-turbo";

// const complete = async (prompt: string) => {
//   const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt,
//     temperature: 0.9,
//     n: 1,
//     max_tokens: 2000,
//   });

//   logOnDev(prompt);
//   // const completion = await openai.createChatCompletion({
//   //   model: "gpt-3.5-turbo-0301",
//   //   messages: [
//   //     {
//   //       role: "system",
//   //       content: prompt,
//   //     },
//   //   ],
//   //   temperature: 0.9,
//   //   n: 1,
//   // });

//   logOnDev(completion.data);

//   const content = completion.data.choices[0].text;
//   if (!content) {
//     throw new Error("No completion result");
//   }
//   // const { message } = completion.data.choices[0];

//   // if (!message) {
//   //   throw new Error("No completion result");
//   // }

//   // const { content } = message;

//   const result = content.slice(content.indexOf("1."));

//   return result;
// };

// export { complete };

import {
  Configuration,
  CreateChatCompletionResponse,
  CreateCompletionResponse,
  OpenAIApi,
} from "openai";
import { logOnDev } from "utils/devUtils";
import { isCreateChatCompletionResponse } from "utils/typeGuards";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

const MODEL1 = "gpt-3.5-turbo";
const MODEL2 = "text-davinci-003";

const complete = async (prompt: string) => {
  const { data } = await Promise.race([
    openai.createChatCompletion({
      model: MODEL1,
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      temperature: 0.9,
      n: 1,
    }),
    openai.createCompletion({
      model: MODEL2,
      prompt,
      temperature: 0.9,
      n: 1,
      max_tokens: 2000,
    }),
  ]);

  logOnDev(data);

  let result = "";

  if (isCreateChatCompletionResponse(data)) {
    const { message } = data.choices[0];

    if (!message) {
      throw new Error("No completion result");
    }

    const { content } = message;

    result = content.slice(content.indexOf("1."));
  } else {
    const { text } = data.choices[0];

    if (!text) {
      throw new Error("No completion result");
    }

    result = text.slice(text.indexOf("1."));
  }

  return result;
};

export { complete };
