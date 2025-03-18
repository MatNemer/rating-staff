
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
              <div className="mb-4">
                <h2 className="text-lg font-medium">Grupos e Regras</h2>
                <p className="text-sm text-gray-500">
                  Defina as condições e regras do rating que está sendo implementado
                </p>
              </div>
              <ScoreBuilder />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
