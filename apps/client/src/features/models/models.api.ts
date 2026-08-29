import type { ApiResponse, ModelInfo } from "@river/types";

import { api } from "@/utils/api";

export async function getModels() {
  const response = await api.get<ApiResponse<ModelInfo[]>>("/models");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}
