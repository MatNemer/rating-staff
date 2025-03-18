
import { Input } from "@/components/ui/input";
import { Group, GroupItemProps } from "./types";
import { RuleItem } from "./RuleItem";
import { Edit, MinusCircle, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const GroupItem: React.FC<GroupItemProps> = ({
  group,
  onRemove,
  onScoreChange,
  onEdit,
  onAddGroup,
  onAddRule,
  onToggle
}) => {
  return (
    <div className="flex flex-col w-full border border-[#E0E0E0] rounded-md bg-white mb-4">
      <Collapsible open={group.isOpen} onOpenChange={() => onToggle(group.id)}>
        <div className="flex items-center gap-4 w-full p-2 px-4 bg-white">
          <div className="p-2">
            <MinusCircle className="h-6 w-6 text-[#C62828]" />
          </div>
          
          <div className="flex items-center gap-2 flex-1">
            <span className="text-base font-bold text-[rgba(0,0,0,0.87)]">{group.name}</span>
            <div className="p-2 rounded-full">
              <Edit className="h-6 w-6 text-[#BDBDBD] cursor-pointer" onClick={() => onEdit(group.id)} />
            </div>
          </div>
          
          <div className="w-20">
            <div className="border border-[rgba(0,0,0,0.23)] rounded-md">
              <div className="flex min-h-6 p-2 items-center">
                <div className="flex-1 text-base text-[rgba(0,0,0,0.38)]">
                  <Input
                    type="number"
                    value={group.score}
                    onChange={(e) => onScoreChange(group.id, parseInt(e.target.value) || 0)}
                    className="border-none p-0 h-6 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <CollapsibleTrigger className="p-2 rounded-full">
            {group.isOpen ? (
              <ChevronUp className="h-6 w-6 text-[rgba(0,0,0,0.56)]" />
            ) : (
              <ChevronDown className="h-6 w-6 text-[rgba(0,0,0,0.56)]" />
            )}
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="flex flex-col p-4 pt-2 space-y-2">
            {group.items.map((item) => (
              item.type === 'group' ? (
                <GroupItem
                  key={item.id}
                  group={item}
                  onRemove={onRemove}
                  onScoreChange={onScoreChange}
                  onEdit={onEdit}
                  onAddGroup={onAddGroup}
                  onAddRule={onAddRule}
                  onToggle={onToggle}
                />
              ) : (
                <RuleItem
                  key={item.id}
                  rule={item}
                  onRemove={onRemove}
                  onScoreChange={onScoreChange}
                  onEdit={onEdit}
                />
              )
            ))}
            
            <div className="flex gap-2 mt-2">
              <div 
                className="flex items-center gap-2 px-1 py-1 cursor-pointer text-[#1976D2]"
                onClick={() => onAddGroup(group.id)}
              >
                <Plus className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Adicionar grupo</span>
              </div>
              
              <div 
                className="flex items-center gap-2 px-1 py-1 cursor-pointer text-[#9C27B0]"
                onClick={() => onAddRule(group.id)}
              >
                <Plus className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Adicionar regra</span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
