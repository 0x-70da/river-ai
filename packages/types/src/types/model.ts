export type ModelLevel = "fast" | "balanced" | "smart" | "pro";

export type ModelProvider = "google" | "groq" | "deepseek";

export interface ModelInfo {
  id: string;
  name: string;
  provider: ModelProvider;
  level: ModelLevel;
}

export interface ModelFallback {
  didFallback: boolean;
  requestedModel: ModelInfo;
  model: ModelInfo;
  fallbackReason?: string;
}

export interface SendMessageInput {
  content: string;
  modelId: string;
}
