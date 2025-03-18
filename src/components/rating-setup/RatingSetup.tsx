
import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BranchForm } from "./BranchForm";
import { BranchFormData } from "./types";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreBuilder } from "./ScoreBuilder";

export const RatingSetup = () => {
  const handleSaveDraft = () => {
    console.log("Saving draft...");
  };

  const handlePublish = () => {
    console.log("Publishing...");
  };

  const handleOrganizationChange = (org: string) => {
    console.log("Organization changed:", org);
  };

  const handleWorkflowChange = (workflow: string) => {
    console.log("Workflow changed:", workflow);
  };

  const handleVersionChange = (version: string) => {
    console.log("Version changed:", version);
  };

  const handleBranchFormSubmit = (data: BranchFormData) => {
    console.log("Branch form submitted:", data);
  };

  return (
    <div className="bg-white overflow-hidden">
      <Header onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
      <div className="w-full flex">
        <div className="w-[250px] flex-shrink-0">
          <Sidebar
            onOrganizationChange={handleOrganizationChange}
            onWorkflowChange={handleWorkflowChange}
            onVersionChange={handleVersionChange}
          />
        </div>
        
        {/* Vertical separator line */}
        <Separator orientation="vertical" className="h-[calc(100vh-64px)] bg-[#F1F1F1]" />
        
        <div className="flex-1">
          <Tabs defaultValue="branch">
            <TabsList className="w-full bg-white border-b border-gray-200 px-6">
              <TabsTrigger value="branch" className="px-6 py-4">Ramificação</TabsTrigger>
              <TabsTrigger value="scores" className="px-6 py-4">Pontuações</TabsTrigger>
            </TabsList>
            <TabsContent value="branch" className="p-0 mt-0">
              <BranchForm onSubmit={handleBranchFormSubmit} />
            </TabsContent>
            <TabsContent value="scores" className="p-6 mt-0">
              <div className="flex justify-between items-center w-full mb-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-[16px] font-semibold text-black/87 font-['Roboto'] leading-[160%] tracking-[0.15px]">
                    Grupos e Regras
                  </h2>
                  <p className="text-sm text-[#757575] font-['Roboto'] leading-[157%] tracking-[0.1px]">
                    Defina as condições e regras do rating que está sendo implementado
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 6.75H11.25V2.25H6.75V6.75H3.75L9 12L14.25 6.75ZM3.75 13.5V15H14.25V13.5H3.75Z" fill="black" fillOpacity="0.38"/>
                  </svg>
                  <span className="text-xs text-black/38 font-['Roboto'] font-medium uppercase tracking-[0.46px]">
                    BAIXAR DEFINITION
                  </span>
                </div>
              </div>
              <ScoreBuilder />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
