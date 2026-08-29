import { generateText } from "ai";

import type { ModelFallback } from "@river/types";

import { getModel, getModelInfo } from "./models.js";

import { shouldFallbackToAnotherModel } from "./model-errors.js";
import { getFallbackModels } from "./fallback-models.js";

interface GenerateWithFallbackOptions {
  modelId: string;
  prompt: string;
  system?: string;
}

export type GenerateWithFallbackResult = ModelFallback & {
  text: string;
};

export async function generateWithFallback({
  modelId,
  prompt,
  system,
}: GenerateWithFallbackOptions): Promise<GenerateWithFallbackResult> {
  const requestedModel = getModelInfo(modelId);

  try {
    const result = await generateText({
      model: getModel(modelId),
      prompt,
      system,
      temperature: 0.7,
    });

    return {
      text: result.text,
      model: requestedModel,
      requestedModel,
      didFallback: false,
    };
  } catch (error) {
    if (!shouldFallbackToAnotherModel(error)) {
      throw error;
    }

    const fallbackModels = getFallbackModels(modelId);

    if (!fallbackModels.length) {
      throw error;
    }

    const fallbackReason = getFallbackReason(error);

    for (const fallbackModel of fallbackModels) {
      try {
        const result = await generateText({
          model: getModel(fallbackModel.id),
          prompt,
          system,
          temperature: 0.7,
        });

        return {
          text: result.text,
          model: fallbackModel,
          requestedModel,
          didFallback: true,
          fallbackReason,
        };
      } catch (fallbackError) {
        console.error(`Fallback model "${fallbackModel.id}" failed:`, fallbackError);

        if (!shouldFallbackToAnotherModel(fallbackError)) {
          throw fallbackError;
        }
      }
    }

    throw new Error("The selected model and all fallback models are currently unavailable.", {
      cause: error,
    });
  }
}

function getFallbackReason(error: unknown): string {
  const errorWithDetails = error as {
    statusCode?: number;
    status?: number;
    code?: string;
    message?: string;
  };

  const status = errorWithDetails.statusCode ?? errorWithDetails.status;

  if (status === 404) {
    return "The selected model was not found or is unavailable.";
  }

  if (status === 429) {
    return "The selected model reached its rate limit.";
  }

  if (status && status >= 500) {
    return "The selected model is temporarily unavailable.";
  }

  return errorWithDetails.message ?? "The selected model could not process the request.";
}
