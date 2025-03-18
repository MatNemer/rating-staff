
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BranchFormProps, Condition } from "./types";
import { ConditionBuilder } from "./ConditionBuilder";
import { PriorityEditorModal } from "./PriorityEditorModal";
import { CreateBranchModal } from "./CreateBranchModal";
import { Plus } from "lucide-react";

export const BranchForm = ({ onSubmit }: BranchFormProps) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isCreateBranchModalOpen, setIsCreateBranchModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("conditional");

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
            onClick={() => setIsCreateBranchModalOpen(true)}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/78373acc90494a24931494d3d68de37d/779f868ee962d5c19449954e56defbf5327e8ef751b5339ca81a0362665e025d?placeholderIfAbsent=true"
              className="w-4 h-6 mr-2"
            />
            Criar branch
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
        <Tabs 
          defaultValue="conditional" 
          className="w-[444px]"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="conditional" className={activeTab === "conditional" ? "text-[#1976D2]" : ""}>
              Condicionais
            </TabsTrigger>
            <TabsTrigger value="score" className={activeTab === "score" ? "text-[#1976D2]" : ""}>
              Pontuações
            </TabsTrigger>
            <TabsTrigger value="grade" className={activeTab === "grade" ? "text-[#1976D2]" : ""}>
              Classificações
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "conditional" && (
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
            onAddExpression={handleAddExpression}
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
      )}

      {activeTab === "score" && (
        <div className="flex flex-col items-start gap-4 w-full mt-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col items-start gap-1">
              <div className="text-[rgba(0,0,0,0.87)] font-['Roboto'] text-base font-semibold leading-[160%] tracking-[0.15px]">
                Grupos e Regras
              </div>
              <div className="text-[#757575] font-['Roboto'] text-sm font-normal leading-[157%] tracking-[0.1px]">
                Defina as condições e regras do rating que está sendo implementado
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.25 6.75H11.25V2.25H6.75V6.75H3.75L9 12L14.25 6.75ZM3.75 13.5V15H14.25V13.5H3.75Z" fill="black" fillOpacity="0.38"/>
              </svg>
              <div className="text-[rgba(0,0,0,0.38)] font-['Roboto'] text-[13px] font-medium leading-[22px] tracking-[0.46px] uppercase">
                Baixar definition
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col justify-center items-center gap-2 w-full py-4 rounded-md border border-[#E0E0E0] bg-white">
              <div className="flex p-2 items-center gap-2.5 rounded bg-[#EEE]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_11906_40993)">
                    <path d="M19 6V16.5L20.95 18.45C20.98 18.3 21 18.15 21 18V6C21 4.9 20.1 4 19 4H6.5L8.5 6H19Z" fill="#323232"/>
                    <path d="M3.2202 3.32031L1.9502 4.59031L3.0002 5.64031V18.0003C3.0002 19.1003 3.9002 20.0003 5.0002 20.0003H17.3602L19.4202 22.0603L20.6902 20.7903L3.2202 3.32031ZM15.0002 18.0003H5.0002V7.64031L15.3602 18.0003H15.0002Z" fill="#323232"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_11906_40993">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-[#757575] font-['Roboto'] text-sm font-normal leading-[157%] tracking-[0.1px]">
                Nenhum grupo adicionado até o momento
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            {/* Updated Adicionar Grupo Button */}
            <button 
              className="flex p-[6px_16px] justify-center items-center rounded bg-[#1976D2] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)] relative cursor-pointer transition-all duration-200"
            >
              <div className="flex justify-center items-center gap-2 relative">
                <div className="flex min-h-6 py-0.5 justify-center items-center relative">
                  <svg className="w-5 h-5 relative" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8337 10.8337H10.8337V15.8337H9.16699V10.8337H4.16699V9.16699H9.16699V4.16699H10.8337V9.16699H15.8337V10.8337Z" fill="white"/>
                  </svg>
                </div>
                <div className="text-white font-['Roboto, sans-serif'] text-sm font-medium leading-6 tracking-[0.4px] uppercase">
                  Adicionar grupo
                </div>
              </div>
            </button>

            {/* Updated Adicionar Regra Button */}
            <button 
              className="flex p-[6px_16px] justify-center items-center rounded bg-[#9C27B0] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)] relative cursor-pointer transition-all duration-200"
            >
              <div className="flex justify-center items-center gap-2 relative">
                <div className="flex min-h-6 py-0.5 justify-center items-center relative">
                  <svg className="w-5 h-5 relative" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8337 10.8337H10.8337V15.8337H9.16699V10.8337H4.16699V9.16699H9.16699V4.16699H10.8337V9.16699H15.8337V10.8337Z" fill="white"/>
                  </svg>
                </div>
                <div className="text-white font-['Roboto, sans-serif'] text-sm font-medium leading-6 tracking-[0.4px] uppercase">
                  Adicionar Regra
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {activeTab === "grade" && (
        <div className="flex w-full flex-col items-stretch mt-4">
          <div className="text-gray-600 text-center p-8">
            Conteúdo da aba Classificações
          </div>
        </div>
      )}

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
