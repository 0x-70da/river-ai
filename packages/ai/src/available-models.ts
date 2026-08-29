import { ModelInfo } from "@river/types";

export const availableModels: ModelInfo[] = [
  {
    id: "gemini-flash-latest",
    name: "Gemini Flash",
    provider: "google",
    level: "fast",
  },
  {
    id: "gemini-flash-lite-latest",
    name: "Gemini Flash Lite",
    provider: "google",
    level: "fast",
  },
  {
    id: "gemini-pro-latest",
    name: "Gemini Pro",
    provider: "google",
    level: "pro",
  },
  {
    id: "groq-qwen-fast",
    name: "Groq Qwen Fast",
    provider: "groq",
    level: "fast",
  },
  {
    id: "groq-qwen-pro",
    name: "Groq Qwen Pro",
    provider: "groq",
    level: "pro",
  },
  {
    id: "groq-llama-fast",
    name: "Groq Llama Fast",
    provider: "groq",
    level: "fast",
  },
  {
    id: "groq-llama-pro",
    name: "Groq Llama Pro",
    provider: "groq",
    level: "pro",
  },
  {
    id: "groq-openai-fast",
    name: "Groq OpenAI Fast",
    provider: "groq",
    level: "fast",
  },
  {
    id: "groq-openai-pro",
    name: "Groq OpenAI Pro",
    provider: "groq",
    level: "pro",
  },
  {
    id: "deepseek-fast",
    name: "DeepSeek Fast",
    provider: "deepseek",
    level: "fast",
  },
  {
    id: "deepseek-pro",
    name: "DeepSeek Pro",
    provider: "deepseek",
    level: "pro",
  },
];

export function getAvailableModels(): ModelInfo[] {
  return availableModels;
}

export function isModelAvailable(modelId: string): boolean {
  return availableModels.some((model) => model.id === modelId);
}
