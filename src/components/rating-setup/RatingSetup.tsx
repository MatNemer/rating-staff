
import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BranchForm } from "./BranchForm";
import { BranchFormData } from "./types";
import { Separator } from "@/components/ui/separator";

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
      <div className="flex relative">
        <div className="min-w-[250px] max-w-[250px]">
          <Sidebar
            onOrganizationChange={handleOrganizationChange}
            onWorkflowChange={handleWorkflowChange}
            onVersionChange={handleVersionChange}
          />
        </div>
        <Separator orientation="vertical" className="h-full absolute left-[250px] bg-[#e0e0e0]" />
        <div className="flex-1 pl-6">
          <BranchForm onSubmit={handleBranchFormSubmit} />
        </div>
      </div>
    </div>
  );
};
