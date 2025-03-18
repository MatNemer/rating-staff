
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BranchFormProps, Condition } from "./types";
import { ConditionBuilder } from "./ConditionBuilder";
import { PriorityEditorModal } from "./PriorityEditorModal";
import { CreateBranchModal } from "./CreateBranchModal";

export const BranchForm = ({ onSubmit }: BranchFormProps) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isCreateBranchModalOpen, setIsCreateBranchModalOpen] = useState(false);

  const handleAddExpression = () => {
    // Add a new condition with AND logical operator
    setConditions([
      ...conditions,
      { field: "", operator: "", value: "", logicalOperator: "AND" },
    ]);
  };

  const handleAddCondition = () => {
    // Add a new condition with OR logical operator
    setConditions([
      ...conditions,
      { field: "", operator: "", value: "", logicalOperator: "OR" },
    ]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index: number, condition: Condition) => {
    const newConditions = [...conditions];
    newConditions[index] = condition;
    setConditions(newConditions);
  };

  const handleCreateBranch = (data: any) => {
    console.log("Creating branch with data:", data);
    // Here you would typically send this data to your API
  };

  return (
    <div className="bg-white min-h-[704px] w-full mx-auto pt-6 pb-8 px-8">
      <div className="flex w-full items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[rgba(66,66,66,1)] font-medium">
            <span>Branch</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/78373acc90494a24931494d3d68de37d/20f0487d1327a743ab3ba5c10d6e8715e52f6cd1e6b61643617a1234c4922ed6?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-3.5"
            />
          </div>
          <Select defaultValue="branch1">
            <SelectTrigger className="w-[268px]">
              <SelectValue placeholder="Produtor Rural PF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="branch1">Produtor Rural PF</SelectItem>
              <SelectItem value="branch2">Branch 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className="bg-[#1976D2] text-white"
            onClick={() => setIsCreateBranchModalOpen(true)}
          >
            <span className="text-white mr-1">+</span>
            CRIAR
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setIsPriorityModalOpen(true)}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/78373acc90494a24931494d3d68de37d/4f40f6bd14d67056eb7dacead688e8cf96ecb1540b2a503d1e48c3e908293fe8?placeholderIfAbsent=true"
              className="w-[18px] h-[18px] mr-2"
            />
            Editar Prioridade
          </Button>
        </div>
      </div>

      <div className="mt-4 border-b border-[rgba(238,238,238,1)]">
        <Tabs defaultValue="conditional" className="w-[444px]">
          <TabsList>
            <TabsTrigger value="conditional" className="text-[#1976D2]">
              EDITAR BRANCH
            </TabsTrigger>
            <TabsTrigger value="score">SCORE</TabsTrigger>
            <TabsTrigger value="grade">GRADE</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex w-full flex-col items-stretch mt-4">
        <div className="w-full mb-4">
          <label className="text-[rgba(33,33,33,1)] text-sm font-medium">
            Nome da Branch
          </label>
          <Input
            className="mt-1.5"
            placeholder="Produtor Rural PF"
            defaultValue="Produtor Rural PF"
          />
        </div>

        <div className="mb-2">
          <label className="text-[rgba(33,33,33,1)] text-sm font-medium">
            Condições
          </label>
        </div>

        <ConditionBuilder
          conditions={conditions}
          onAddCondition={handleAddCondition}
          onAddExpression={handleAddExpression}
          onRemoveCondition={handleRemoveCondition}
          onConditionChange={handleConditionChange}
        />

        <div className="mt-4">
          <Button
            variant="secondary"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={() => onSubmit({ branchName: "", conditions })}
          >
            SALVAR ALTERAÇÕES
          </Button>
        </div>
      </div>

      <PriorityEditorModal
        open={isPriorityModalOpen}
        onOpenChange={setIsPriorityModalOpen}
        onSave={(items) => {
          console.log("Saved priorities:", items);
          // Here you would handle the saved priority order
        }}
      />

      <CreateBranchModal
        open={isCreateBranchModalOpen}
        onOpenChange={setIsCreateBranchModalOpen}
        onSave={handleCreateBranch}
      />
    </div>
  );
};
