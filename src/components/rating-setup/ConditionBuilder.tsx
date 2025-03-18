import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConditionBuilderProps } from "./types";
import { Plus, X } from "lucide-react";

export const ConditionBuilder = ({
  conditions,
  onAddCondition,
  onRemoveCondition,
  onConditionChange,
}: ConditionBuilderProps) => {
  return (
    <div className="w-full mt-4">
      <div className="text-[rgba(33,33,33,1)] text-sm font-semibold">
        Condições*
      </div>
      <div className="rounded border flex w-full flex-col items-stretch mt-2 p-2.5 border-[rgba(238,238,238,1)]">
        {conditions.map((condition, index) => (
          <div
            key={index}
            className="rounded bg-neutral-100 flex w-full flex-col items-stretch text-base text-black font-normal tracking-[0.15px] justify-center p-2.5 mb-2"
          >
            <div className="flex min-h-10 w-full items-center gap-3 flex-wrap">
              <Select
                value={condition.field}
                onValueChange={(value) =>
                  onConditionChange(index, { ...condition, field: value })
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione um campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="field1">Campo 1</SelectItem>
                  <SelectItem value="field2">Campo 2</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={condition.operator}
                onValueChange={(value) =>
                  onConditionChange(index, { ...condition, operator: value })
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione uma condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Igual a</SelectItem>
                  <SelectItem value="greater">Maior que</SelectItem>
                  <SelectItem value="less">Menor que</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={condition.value}
                onValueChange={(value) =>
                  onConditionChange(index, { ...condition, value })
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecione um valor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="value1">Valor 1</SelectItem>
                  <SelectItem value="value2">Valor 2</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveCondition(index)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          onClick={onAddCondition}
          className="flex items-center gap-2 text-[#8B8B8B] text-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="uppercase">adicionar expressão</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        onClick={onAddCondition}
        className="flex items-center gap-2 text-[#8B8B8B] text-sm mt-2"
      >
        <Plus className="h-4 w-4" />
        <span className="uppercase">adicionar condição</span>
      </Button>
    </div>
  );
};
