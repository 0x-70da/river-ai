import { generateText } from "ai";

import { getModel } from "./models.js";

const TITLE_SYSTEM_PROMPT = `
Generate a short title for the conversation.

Rules:
- Maximum 5 words.
- Return only the title.
- Do not use quotes.
- Do not add punctuation.
`;

interface GenerateTitleOptions {
  content: string;
  modelId: string;
}

export async function generateTitle({ content, modelId }: GenerateTitleOptions) {
  const model = getModel(modelId);

  const result = await generateText({
    model,
    system: TITLE_SYSTEM_PROMPT,
    prompt: content,
    temperature: 0.2,
  });

  return result.text.trim();
}
