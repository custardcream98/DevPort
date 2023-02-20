import { encode } from "gpt-3-encoder";

const calNumberOfTokens = (text: string) => {
  const encoded = encode(text);
  return encoded.length;
};

export { calNumberOfTokens };
