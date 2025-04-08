import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BranchForm } from "./BranchForm";
import { BranchFormData } from "./types";
import { Separator } from "@/components/ui/separator";
import { RatingPreviewButton } from "./RatingPreviewButton";
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
  return <div className="bg-white overflow-hidden">
      <Header onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
      <div className="w-full flex">
        <div className="w-[250px] flex-shrink-0">
          <Sidebar onOrganizationChange={handleOrganizationChange} onWorkflowChange={handleWorkflowChange} onVersionChange={handleVersionChange} />
        </div>
        
        {/* Vertical separator line */}
        <Separator orientation="vertical" className="h-[calc(100vh-64px)] bg-[#F1F1F1]" />
        
        <div className="flex-1">
          {/* Rating Preview Button */}
          
          
          <BranchForm onSubmit={handleBranchFormSubmit} />
        </div>
      </div>
    </div>;
};