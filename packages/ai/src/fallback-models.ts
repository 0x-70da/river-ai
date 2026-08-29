import { ModelInfo } from "@river/types";
import { availableModels } from "./available-models.js";

const fallbackModels: Record<string, string[]> = {
  "gemini-flash-lite-latest": ["gemini-flash-latest", "gemini-pro"],
  "gemini-flash-latest": ["gemini-flash-lite-latest", "gemini-pro"],
  "gemini-pro": ["gemini-flash-lite-latest", "gemini-flash-latest"],

  "groq-qwen-fast": [
    "groq-qwen-pro",
    "groq-llama-fast",
    "groq-llama-pro",
    "groq-openai-fast",
    "groq-openai-pro",
  ],
  "groq-qwen-pro": [
    "groq-qwen-fast",
    "groq-llama-fast",
    "groq-llama-pro",
    "groq-openai-fast",
    "groq-openai-pro",
  ],

  "groq-llama-fast": [
    "groq-llama-pro",
    "groq-qwen-fast",
    "groq-qwen-pro",
    "groq-openai-fast",
    "groq-openai-pro",
  ],
  "groq-llama-pro": [
    "groq-llama-fast",
    "groq-qwen-fast",
    "groq-qwen-pro",
    "groq-openai-fast",
    "groq-openai-pro",
  ],

  "groq-openai-fast": [
    "groq-openai-pro",
    "groq-qwen-fast",
    "groq-qwen-pro",
    "groq-llama-fast",
    "groq-llama-pro",
  ],
  "groq-openai-pro": [
    "groq-openai-fast",
    "groq-qwen-fast",
    "groq-qwen-pro",
    "groq-llama-fast",
    "groq-llama-pro",
  ],

  "deepseek-fast": ["deepseek-pro"],
  "deepseek-pro": ["deepseek-fast"],
};

export function getFallbackModels(modelId: string): ModelInfo[] {
  const fallbacks = fallbackModels[modelId];

  if (!fallbacks?.length) {
    return [];
  }

  return fallbacks
    .map((fallbackId) => availableModels.find((model) => model.id === fallbackId))
    .filter((model): model is ModelInfo => Boolean(model));
}

export function getFallbackModel(modelId: string): ModelInfo | null {
  return getFallbackModels(modelId)[0] ?? null;
}
