import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@river/ui";

import type { ModelInfo } from "@river/types";

interface ModelSelectorProps {
  models: ModelInfo[];
  modelId: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
}

export function ModelSelector({ models, modelId, onChange, disabled = false }: ModelSelectorProps) {
  const handleValueChange = (value: string | null) => {
    if (value === null) return;
    onChange(value);
  };
  return (
    <Select value={modelId} onValueChange={handleValueChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select model" />
      </SelectTrigger>

      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <div className="flex items-center gap-2">
              <span>{model.name}</span>

              <span className="text-xs text-muted-foreground">{model.level}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
