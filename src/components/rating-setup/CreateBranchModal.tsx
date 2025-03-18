
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus, X } from "lucide-react";

interface CreateBranchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (data: { branchName: string }) => void;
}

export const CreateBranchModal = ({
  open,
  onOpenChange,
  onConfirm,
}: CreateBranchModalProps) => {
  const [branchName, setBranchName] = useState("");
  
  const handleConfirm = () => {
    onConfirm({ branchName });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 font-roboto">
        <DialogHeader className="px-6 pt-4 pb-0">
          <DialogTitle className="text-[20px] font-medium leading-[160%] text-[rgba(0,0,0,0.87)] tracking-[0.15px]">
            Criar Branch
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-4">
          <p className="text-[rgba(0,0,0,0.60)] text-xs tracking-[0.4px]">
            Os campos com * são obrigatórios
          </p>

          <div className="flex flex-col gap-1.5">
            <Label className="text-[#212121] text-sm font-medium" htmlFor="branchName">
              Nome da Branch*
            </Label>
            <div className="border border-[rgba(0,0,0,0.23)] bg-white rounded-md">
              <Input
                id="branchName"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="Informe o nome da Branch"
                className="border-0 text-base"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-[#212121] text-sm font-medium">
              Branch de Referencia
            </Label>
            <p className="text-[rgba(0,0,0,0.60)] text-xs tracking-[0.4px]">
              Utilize as definições de uma Branch criada anteriormente para configurar a nova. Este campo é opcional.
            </p>
            
            <div className="flex gap-4 mt-2 sm:flex-row flex-col">
              <div className="flex-1 relative">
                <Select>
                  <SelectTrigger className="relative border-[rgba(0,0,0,0.23)]">
                    <SelectValue placeholder="Selecione uma Org" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="org1">Organização 1</SelectItem>
                    <SelectItem value="org2">Organização 2</SelectItem>
                  </SelectContent>
                </SelectTrigger>
                <div className="absolute -top-[6px] left-[12px] px-1 bg-white text-xs text-[rgba(0,0,0,0.60)]">
                  Organização
                </div>
              </div>
              
              <div className="flex-1 relative">
                <Select>
                  <SelectTrigger className="relative border-[rgba(0,0,0,0.23)]">
                    <SelectValue placeholder="Selecione um Workflow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workflow1">Workflow 1</SelectItem>
                    <SelectItem value="workflow2">Workflow 2</SelectItem>
                  </SelectContent>
                </SelectTrigger>
                <div className="absolute -top-[6px] left-[12px] px-1 bg-white text-xs text-[rgba(0,0,0,0.60)]">
                  Workflow
                </div>
              </div>
              
              <div className="flex-1 relative">
                <Select>
                  <SelectTrigger className="relative border-[rgba(0,0,0,0.23)]">
                    <SelectValue placeholder="Selecione uma Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branch1">Branch 1</SelectItem>
                    <SelectItem value="branch2">Branch 2</SelectItem>
                  </SelectContent>
                </SelectTrigger>
                <div className="absolute -top-[6px] left-[12px] px-1 bg-white text-xs text-[rgba(0,0,0,0.60)]">
                  Branch de referencia
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <Label className="text-[#212121] text-sm font-semibold">
              Condições*
            </Label>
            <div className="border border-[#EEE] rounded-md p-2.5 flex flex-col gap-2.5">
              <div className="bg-[#F5F5F5] rounded-md p-2.5 flex flex-col gap-2.5">
                <div className="flex items-center gap-3 sm:flex-row flex-col">
                  <div className="flex-1 bg-white">
                    <Select>
                      <SelectTrigger className="border-[rgba(0,0,0,0.23)]">
                        <SelectValue placeholder="Selecione um campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="field1">Campo 1</SelectItem>
                        <SelectItem value="field2">Campo 2</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </div>
                  
                  <div className="flex-1 bg-white">
                    <Select>
                      <SelectTrigger className="border-[rgba(0,0,0,0.23)]">
                        <SelectValue placeholder="Selecione uma condição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Igual a</SelectItem>
                        <SelectItem value="greater">Maior que</SelectItem>
                        <SelectItem value="less">Menor que</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </div>
                  
                  <div className="flex-1 bg-white">
                    <Select>
                      <SelectTrigger className="border-[rgba(0,0,0,0.23)]">
                        <SelectValue placeholder="Selecione um valor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="value1">Valor 1</SelectItem>
                        <SelectItem value="value2">Valor 2</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <X className="h-5 w-5 text-[#C62828]" />
                  </Button>
                </div>
              </div>

              <Button
                variant="ghost"
                className="flex items-center gap-1 text-[#1976D2] justify-center"
              >
                <Plus className="h-4 w-4" />
                <span className="text-xs font-medium tracking-wider uppercase">
                  adicionar EXPRESSÃO
                </span>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="flex items-center gap-1 text-[#1976D2] w-fit"
            >
              <Plus className="h-4 w-4" />
              <span className="text-xs font-medium tracking-wider uppercase">
                adicionar Condição
              </span>
            </Button>
          </div>
        </div>

        <DialogFooter className="px-6 py-2 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-[#1976D2] uppercase font-medium text-sm">
            cancelar
          </Button>
          <Button 
            type="submit" 
            variant="ghost"
            onClick={handleConfirm}
            disabled={!branchName.trim()}
            className={`uppercase font-medium text-sm ${!branchName.trim() ? 'text-[rgba(0,0,0,0.38)]' : 'text-[#1976D2]'}`}
          >
            Criar branch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
