
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
import { CreateBranchModal } from "./CreateBranchModal";

export const BranchForm = ({ onSubmit }: BranchFormProps) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleAddCondition = () => {
    setConditions([...conditions, { field: "", operator: "", value: "" }]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index: number, condition: Condition) => {
    const newConditions = [...conditions];
    newConditions[index] = condition;
    setConditions(newConditions);
  };

  const handleCreateBranch = (data: { branchName: string }) => {
    console.log("Creating new branch:", data);
    // Here you would typically create the branch in your backend
  };

  return (
    <div className="bg-white min-h-[704px] w-full mx-auto pt-8 pb-[274px] px-8">
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap">
        <div className="self-stretch flex min-w-60 items-center gap-2 text-base tracking-[0.15px]">
          <div className="self-stretch flex items-center gap-1 text-[rgba(66,66,66,1)] font-medium whitespace-nowrap justify-center">
            <span>Branch</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/78373acc90494a24931494d3d68de37d/20f0487d1327a743ab3ba5c10d6e8715e52f6cd1e6b61643617a1234c4922ed6?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-3.5"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[268px]">
              <SelectValue placeholder="Selecione uma Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="branch1">Branch 1</SelectItem>
              <SelectItem value="branch2">Branch 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="self-stretch flex min-w-60 items-center gap-2 text-[13px] font-medium uppercase tracking-[0.46px] leading-loose">
          <Button 
            className="bg-[#1976D2] text-white"
            onClick={() => setCreateModalOpen(true)}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/78373acc90494a24931494d3d68de37d/779f868ee962d5c19449954e56defbf5327e8ef751b5339ca81a0362665e025d?placeholderIfAbsent=true"
              className="w-4 h-6 mr-2"
            />
            Criar branch
          </Button>
          <Button variant="secondary">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/78373acc90494a24931494d3d68de37d/4f40f6bd14d67056eb7dacead688e8cf96ecb1540b2a503d1e48c3e908293fe8?placeholderIfAbsent=true"
              className="w-[18px] h-[18px] mr-2"
            />
            Editar Prioridade
          </Button>
        </div>
      </div>

      <div className="mt-4 border-b border-[rgba(238,238,238,1)]">
        <Tabs defaultValue="edit" className="w-[444px]">
          <TabsList>
            <TabsTrigger value="edit" className="text-[#1976D2]">
              Editar Branch
            </TabsTrigger>
            <TabsTrigger value="score">Score</TabsTrigger>
            <TabsTrigger value="grade">Grade</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex w-full flex-col items-stretch mt-4">
        <div className="w-full">
          <label className="text-[rgba(33,33,33,1)] text-sm font-medium">
            Nome da Branch
          </label>
          <Input
            className="mt-1.5 bg-neutral-100"
            placeholder="Selecione uma Branch"
          />
        </div>

        <ConditionBuilder
          conditions={conditions}
          onAddCondition={handleAddCondition}
          onRemoveCondition={handleRemoveCondition}
          onConditionChange={handleConditionChange}
        />

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => onSubmit({ branchName: "", conditions })}
        >
          Salvar alterações
        </Button>
      </div>
      
      <CreateBranchModal 
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onConfirm={handleCreateBranch}
      />
    </div>
  );
};
