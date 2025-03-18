import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BranchForm } from "./BranchForm";
import { BranchFormData } from "./types";

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
    <div className="bg-neutral-100 overflow-hidden">
      <Header onSaveDraft={handleSaveDraft} onPublish={handlePublish} />
      <div className="w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[22%] max-md:w-full">
            <Sidebar
              onOrganizationChange={handleOrganizationChange}
              onWorkflowChange={handleWorkflowChange}
              onVersionChange={handleVersionChange}
            />
          </div>
          <div className="w-[78%] ml-5 max-md:w-full max-md:ml-0">
            <BranchForm onSubmit={handleBranchFormSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
