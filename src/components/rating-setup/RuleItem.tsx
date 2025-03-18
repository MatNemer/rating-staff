
import { Input } from "@/components/ui/input";
import { Rule, RuleItemProps } from "./types";
import { AppRegistration, MinusCircle } from "lucide-react";

export const RuleItem: React.FC<RuleItemProps> = ({ 
  rule, 
  onRemove, 
  onScoreChange,
  onEdit
}) => {
  return (
    <div className="flex items-center gap-2 w-full p-1 px-2 rounded-md bg-[#F5F5F5] mb-2">
      <div className="p-2">
        <MinusCircle className="h-6 w-6 text-[#C62828]" />
      </div>
      
      <div className="flex-1">
        <span className="text-base font-normal text-[#212121]">{rule.name}</span>
      </div>
      
      <div className="w-20">
        <div className="border border-[rgba(0,0,0,0.23)] rounded-md bg-white">
          <div className="flex min-h-6 p-2 items-center">
            <div className="flex-1 text-base text-[#212121]">
              <Input
                type="number"
                value={rule.score}
                onChange={(e) => onScoreChange(rule.id, parseInt(e.target.value) || 0)}
                className="border-none p-0 h-6 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-10 h-10 flex justify-center items-center cursor-pointer" onClick={() => onEdit(rule.id)}>
        <AppRegistration className="h-6 w-6 text-[#424242]" />
      </div>
    </div>
  );
};
