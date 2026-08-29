import { useQuery } from "@tanstack/react-query";

import { getModels } from "./models.api";

export function useModels() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    staleTime: Infinity,
  });

  return { models: data, isLoadingModels: isLoading, isModelsError: isError };
}
