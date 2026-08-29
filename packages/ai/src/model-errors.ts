export function shouldFallbackToAnotherModel(error: unknown): boolean {
  if (!error) {
    return false;
  }

  const errorWithDetails = error as {
    statusCode?: number;
    status?: number;
    code?: string;
    message?: string;
  };

  const status = errorWithDetails.statusCode ?? errorWithDetails.status;

  if (
    status === 400 ||
    status === 404 ||
    status === 408 ||
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  ) {
    return true;
  }

  const code = errorWithDetails.code?.toLowerCase();
  const message = errorWithDetails.message?.toLowerCase();

  const fallbackCodes = [
    "model_not_found",
    "model_unavailable",
    "rate_limit",
    "rate_limit_exceeded",
    "quota_exceeded",
    "service_unavailable",
    "timeout",
  ];

  if (code && fallbackCodes.some((value) => code.includes(value))) {
    return true;
  }

  const fallbackMessages = [
    "model not found",
    "model_not_found",
    "model unavailable",
    "model_unavailable",
    "rate limit",
    "rate_limit",
    "quota exceeded",
    "temporarily unavailable",
    "timeout",
  ];

  return !!message && fallbackMessages.some((value) => message.includes(value));
}
