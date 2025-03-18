
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProps } from "./types";

export const Sidebar = ({
  onOrganizationChange,
  onWorkflowChange,
  onVersionChange,
}: SidebarProps) => {
  return (
    <div className="min-h-[704px] w-full pt-4 px-4">
      <h2 className="text-base font-semibold leading-[1.6] mb-6">
        Ambiente de configuração
      </h2>
      <div className="w-full mb-6">
        <p className="text-sm text-gray-500 mb-1">Organização</p>
        <Select onValueChange={onOrganizationChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma org" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="org1">Organização 1</SelectItem>
            <SelectItem value="org2">Organização 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full mb-6">
        <p className="text-sm text-gray-500 mb-1">Workflow</p>
        <Select onValueChange={onWorkflowChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um Workflow" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="workflow1">Workflow 1</SelectItem>
            <SelectItem value="workflow2">Workflow 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-500 mb-1">Versão</p>
        <Select onValueChange={onVersionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma versão" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="v1">Versão 1.0</SelectItem>
            <SelectItem value="v2">Versão 2.0</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
