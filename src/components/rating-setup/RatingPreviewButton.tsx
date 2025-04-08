
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RatingPreviewModal } from "./RatingPreviewModal";

export const RatingPreviewButton: React.FC = () => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  
  return (
    <>
      <div 
        className="flex py-1.5 px-4 flex-col justify-center items-center rounded border border-[rgba(25,118,210,0.50)] cursor-pointer"
        onClick={() => setIsPreviewModalOpen(true)}
      >
        <div className="flex justify-center items-center gap-2">
          <div className="text-[#1976D2] font-['Roboto'] text-sm font-normal leading-[150%] tracking-[0.15px] uppercase">
            Preview
          </div>
        </div>
      </div>

      <RatingPreviewModal open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen} />
    </>
  );
};
