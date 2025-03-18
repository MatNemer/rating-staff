
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
    <div className="bg-white min-h-[704px] w-full text-black font-normal tracking-[0.15px] pt-4 px-4 pb-8">
      <h2 className="text-base font-semibold leading-[1.6] mb-4">
        Ambiente de configuração
      </h2>
      
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Organização</p>
          <Select onValueChange={onOrganizationChange} defaultValue="super-demo">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Super Demo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="super-demo">Super Demo</SelectItem>
              <SelectItem value="org2">Organização 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Workflow</p>
          <Select onValueChange={onWorkflowChange} defaultValue="standard">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Standard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="workflow2">Workflow 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Versão</p>
          <Select onValueChange={onVersionChange} defaultValue="v1">
            <SelectTrigger className="w-full flex items-center">
              <span className="text-green-500 mr-1">▼</span>
              <SelectValue placeholder="2025-03-16T21:55:50.384Z" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">2025-03-16T21:55:50.384Z</SelectItem>
              <SelectItem value="v2">Versão 2.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
