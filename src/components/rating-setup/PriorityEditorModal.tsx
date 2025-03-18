
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

type PriorityItem = {
  id: string;
  name: string;
};

interface PriorityEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (items: PriorityItem[]) => void;
}

export const PriorityEditorModal = ({
  open,
  onOpenChange,
  onSave,
}: PriorityEditorModalProps) => {
  // Initialize with sample priority items
  const [items, setItems] = useState<PriorityItem[]>([
    { id: "1", name: "Animal PF Simples" },
    { id: "2", name: "Animal PF Completo" },
    { id: "3", name: "Animal PJ Simples" },
    { id: "4", name: "PJ Completo" },
    { id: "5", name: "Produtor Rural PJ2" },
  ]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("itemIndex", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const draggedItemIndex = parseInt(e.dataTransfer.getData("itemIndex"));
    
    if (draggedItemIndex === targetIndex) return;
    
    const newItems = [...items];
    const draggedItem = newItems[draggedItemIndex];
    
    // Remove the dragged item
    newItems.splice(draggedItemIndex, 1);
    
    // Insert it at the target position
    newItems.splice(targetIndex, 0, draggedItem);
    
    setItems(newItems);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-medium text-[rgba(0,0,0,0.87)] tracking-[0.15px] font-[Roboto,sans-serif]">
          Editar Prioridade
        </DialogTitle>
        <div className="text-xs text-[#9E9E9E] font-[Roboto,sans-serif] tracking-[0.1px] leading-[157%]">
          Clique e arraste para alterar a ordem dos itens
        </div>
        
        <div className="flex flex-col gap-2 mt-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="flex items-center gap-2 p-2 border border-[#EEE] rounded-md"
            >
              <div className="cursor-grab">
                <GripVertical className="h-4 w-4 text-[#E0E0E0]" />
              </div>
              <span className="text-[#212121] font-[Roboto,sans-serif] text-base">
                {item.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-[#1976D2] font-[Roboto,sans-serif] font-medium text-sm tracking-[0.4px] uppercase"
          >
            CANCELAR
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSave(items);
              onOpenChange(false);
            }}
            className="text-[#1976D2] font-[Roboto,sans-serif] font-medium text-sm tracking-[0.4px] uppercase"
          >
            SALVAR ORDEM
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
