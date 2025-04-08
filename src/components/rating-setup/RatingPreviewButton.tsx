import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RatingPreviewModal } from "./RatingPreviewModal";
export const RatingPreviewButton: React.FC = () => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  return <>
      

      <RatingPreviewModal open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen} />
    </>;
};