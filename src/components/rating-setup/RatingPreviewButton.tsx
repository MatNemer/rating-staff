
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RatingPreviewModal } from "./RatingPreviewModal";

export const RatingPreviewButton: React.FC = () => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="flex flex-col items-start gap-2.5 w-full rounded-lg border border-[#E0E0E0] bg-white shadow-lg p-4 hover:bg-gray-50 h-auto"
        onClick={() => setIsPreviewModalOpen(true)}
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-10 w-full flex-col sm:flex-row">
            <div className="flex items-baseline gap-2">
              <div className="text-[#6B6B6B] font-['Roboto'] text-sm font-semibold leading-[160%] uppercase">
                Rating:
              </div>
              <div className="text-[rgba(0,0,0,0.87)] font-['Roboto'] text-2xl font-medium leading-[160%]">
                A+
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-[#6B6B6B] font-['Roboto'] text-sm font-semibold leading-[160%] uppercase">
                Limite Sugerido:
              </div>
              <div className="text-[rgba(0,0,0,0.87)] font-['Roboto'] text-2xl font-medium leading-[160%]">
                R$ 200.000,00
              </div>
            </div>
          </div>
        </div>
      </Button>

      <RatingPreviewModal 
        open={isPreviewModalOpen} 
        onOpenChange={setIsPreviewModalOpen} 
      />
    </>
  );
};
