
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Condition } from "./types";

type CreateBranchData = {
  branchName: string;
  organization?: string;
  workflow?: string;
  referenceBranch?: string;
  conditions: Condition[];
};

interface CreateBranchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CreateBranchData) => void;
}

export const CreateBranchModal = ({
  open,
  onOpenChange,
  onSave,
}: CreateBranchModalProps) => {
  const [branchName, setBranchName] = useState("");
  const [organization, setOrganization] = useState<string | undefined>();
  const [workflow, setWorkflow] = useState<string | undefined>();
  const [referenceBranch, setReferenceBranch] = useState<string | undefined>();
  const [conditions, setConditions] = useState<Condition[]>([
    { field: "", operator: "", value: "" }
  ]);

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

  const handleUpdateCondition = (
    index: number,
    field: "field" | "operator" | "value",
    value: string
  ) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  const handleSubmit = () => {
    onSave({
      branchName,
      organization,
      workflow,
      referenceBranch,
      conditions,
    });
    onOpenChange(false);
    
    // Reset form
    setBranchName("");
    setOrganization(undefined);
    setWorkflow(undefined);
    setReferenceBranch(undefined);
    setConditions([{ field: "", operator: "", value: "" }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-xl font-medium text-[rgba(0,0,0,0.87)] font-[Roboto,sans-serif] tracking-[0.15px] leading-[160%]">
          Criar Branch
        </DialogTitle>
        
        <div className="text-xs text-[rgba(0,0,0,0.60)] font-[Roboto,sans-serif] tracking-[0.4px]">
          Os campos com * são obrigatórios
        </div>
        
        <div className="flex flex-col gap-6 w-full">
          {/* Branch Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#212121]">
              Nome da Branch*
            </label>
            <Input
              placeholder="Informe o nome da Branch"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </div>
          
          {/* Reference Branch Section */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#212121]">
                Branch de Referencia
              </label>
              <div className="text-xs text-[rgba(0,0,0,0.60)]">
                Utilize as definições de uma Branch criada anteriormente para configurar a nova. Este campo é opcional.
              </div>
            </div>
            
            <div className="flex gap-4 flex-col md:flex-row w-full">
              <div className="flex-1">
                <Select onValueChange={setOrganization} value={organization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma Org" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="org1">Organização 1</SelectItem>
                    <SelectItem value="org2">Organização 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select onValueChange={setWorkflow} value={workflow}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um Workflow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workflow1">Workflow 1</SelectItem>
                    <SelectItem value="workflow2">Workflow 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select onValueChange={setReferenceBranch} value={referenceBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Conditions Section */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-[#212121]">
              Condições*
            </label>
            
            <div className="border border-[#EEE] rounded-md p-2.5 flex flex-col gap-2.5">
              <div className="bg-[#F5F5F5] rounded-md p-2.5 flex flex-col gap-2.5">
                {conditions.map((condition, index) => (
                  <div key={index}>
                    {condition.logicalOperator && (
                      <div className="flex justify-center my-2 font-medium text-gray-700">
                        {condition.logicalOperator === "AND" ? "E" : "OU"}
                      </div>
                    )}
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                      <div className="flex-none">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-red-100 hover:bg-red-200 rounded-md p-2"
                          onClick={() => handleRemoveCondition(index)}
                        >
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </Button>
                      </div>
                      
                      <div className="flex-1 min-w-[150px]">
                        <Select 
                          onValueChange={(value) => handleUpdateCondition(index, "field", value)} 
                          value={condition.field}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Selecione um campo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="field1">Campo 1</SelectItem>
                            <SelectItem value="field2">Campo 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex-1 min-w-[150px]">
                        <Select 
                          onValueChange={(value) => handleUpdateCondition(index, "operator", value)} 
                          value={condition.operator}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Selecione uma condição" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Igual a</SelectItem>
                            <SelectItem value="notEquals">Diferente de</SelectItem>
                            <SelectItem value="greaterThan">Maior que</SelectItem>
                            <SelectItem value="lessThan">Menor que</SelectItem>
                            <SelectItem value="contains">Contém o valor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex-1 min-w-[150px]">
                        <Select 
                          onValueChange={(value) => handleUpdateCondition(index, "value", value)} 
                          value={condition.value}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Selecione um valor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="value1">Valor 1</SelectItem>
                            <SelectItem value="value2">Valor 2</SelectItem>
                            <SelectItem value="value3">Valor 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="ghost"
                  className="text-[#1976D2] justify-start mx-auto"
                  onClick={handleAddExpression}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="uppercase text-xs font-medium tracking-wider">
                    adicionar expressão
                  </span>
                </Button>
              </div>
              
              <Button
                variant="ghost"
                className="text-[#1976D2] justify-start mx-auto"
                onClick={handleAddCondition}
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="uppercase text-xs font-medium tracking-wider">
                  adicionar condição
                </span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-[#1976D2] font-medium uppercase text-sm tracking-[0.4px]"
          >
            cancelar
          </Button>
          <Button
            variant="ghost"
            onClick={handleSubmit}
            disabled={!branchName.trim()}
            className={`font-medium uppercase text-sm tracking-[0.4px] ${
              !branchName.trim() ? "text-[rgba(0,0,0,0.38)]" : "text-[#1976D2]"
            }`}
          >
            Criar branch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
