import { customProvider } from "ai";
import { providerRegistry } from "./registery.js";
import type { ModelFallback, ModelInfo, ModelLevel } from "@river/types";
import { getFallbackModel } from "./fallback-models.js";
import { getAvailableModels, isModelAvailable } from "./available-models.js";
import { LanguageModelV4, ProviderV4 } from "@ai-sdk/provider";

export const registeryModels: ProviderV4 = customProvider({
  languageModels: {
    "gemini-flash-latest": providerRegistry.languageModel("google:gemini-flash-latest"),
    "gemini-flash-lite-latest": providerRegistry.languageModel("google:gemini-flash-lite-latest"),
    "gemini-pro-latest": providerRegistry.languageModel("google:gemini-pro-latest"),

    "groq-qwen-fast": providerRegistry.languageModel("groq:qwen-2.5-32b"),
    "groq-qwen-pro": providerRegistry.languageModel("groq:qwen/qwen3-32b"),

    "groq-llama-fast": providerRegistry.languageModel("groq:llama-3.1-8b-instant"),
    "groq-llama-pro": providerRegistry.languageModel("groq:llama-3.3-70b-versatile"),

    "groq-openai-fast": providerRegistry.languageModel("groq:openai/gpt-oss-20b"),
    "groq-openai-pro": providerRegistry.languageModel("groq:openai/gpt-oss-120b"),

    "deepseek-fast": providerRegistry.languageModel("deepseek:deepseek-chat"),
    "deepseek-pro": providerRegistry.languageModel("deepseek:deepseek-reasoner"),
  },
});

export function getModel(modelId: string): LanguageModelV4 {
  if (!isModelAvailable(modelId)) {
    throw new Error(`Model "${modelId}" is not available`);
  }

  return registeryModels.languageModel(modelId);
}

export function getModelInfo(modelId: string): ModelInfo {
  const availableModels = getAvailableModels();
  const model = availableModels.find((model) => model.id === modelId);

  if (!model) {
    throw new Error(`Model "${modelId}" is not available`);
  }

  return model;
}

export function switchModel(modelId: string, reason?: string): ModelFallback {
  const requestedModel = getModelInfo(modelId);

  const fallbackModel = getFallbackModel(modelId);

  if (!fallbackModel) {
    return {
      requestedModel,
      model: requestedModel,
      didFallback: false,
      fallbackReason: reason,
    };
  }

  return {
    requestedModel,
    model: fallbackModel,
    didFallback: true,
    fallbackReason: reason,
  };
}

export function getModelsByLevel(level: ModelLevel): ModelInfo[] {
  const availableModels = getAvailableModels();
  return availableModels.filter((model) => model.level === level);
}

export function switchModelLevel(level: ModelLevel): ModelInfo | null {
  return getModelsByLevel(level)[0] ?? null;
}
