
import { useState } from "react";
import { Group, Rule } from "./types";
import { RuleItem } from "./RuleItem";
import { ChevronDown, ChevronRight, Edit, MinusCircle, Plus } from "lucide-react";
import { Input } from "../ui/input";

interface GroupItemProps {
  group: Group;
  level?: number;
  onAddGroup: (parentId: string) => void;
  onAddRule: (parentId: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Group>) => void;
  onScoreChange: (id: string, score: number) => void;
}

export const GroupItem = ({
  group,
  level = 0,
  onAddGroup,
  onAddRule,
  onRemove,
  onUpdate,
  onScoreChange,
}: GroupItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);

  const handleSubmitEdit = () => {
    onUpdate(group.id, { name });
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-full mb-2">
        <button 
          className="mr-2 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
          onClick={() => onRemove(group.id)}
        >
          <MinusCircle className="w-4 h-4" />
        </button>
        
        <div className="flex items-center flex-grow">
          {isEditing ? (
            <div className="flex items-center flex-grow">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow"
                onBlur={handleSubmitEdit}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitEdit()}
                autoFocus
              />
            </div>
          ) : (
            <>
              <button
                className="flex items-center"
                onClick={() => onUpdate(group.id, { expanded: !group.expanded })}
              >
                {group.expanded ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
              <div className="font-medium" onClick={() => setIsEditing(true)}>
                {group.name}
              </div>
              <button
                className="ml-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 text-gray-500" />
              </button>
            </>
          )}
        </div>

        <Input
          type="number"
          className="w-20 h-9 text-center ml-auto"
          value={group.score}
          onChange={(e) => onScoreChange(group.id, parseInt(e.target.value) || 0)}
        />
        
        <button className="ml-2">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {group.expanded && (
        <div className={`pl-6 border-l border-gray-200 ml-3 ${level > 0 ? "mt-2" : ""}`}>
          {group.items.map((item) => 
            "items" in item ? (
              <GroupItem
                key={item.id}
                group={item as Group}
                level={level + 1}
                onAddGroup={onAddGroup}
                onAddRule={onAddRule}
                onRemove={onRemove}
                onUpdate={onUpdate}
                onScoreChange={onScoreChange}
              />
            ) : (
              <RuleItem
                key={item.id}
                rule={item as Rule}
                onRemove={onRemove}
                onUpdate={(id, updates) => onUpdate(id, updates as any)}
                onScoreChange={onScoreChange}
              />
            )
          )}

          <div className="flex space-x-2 my-2">
            <button 
              className="flex items-center text-[#1976D2] text-xs"
              onClick={() => onAddGroup(group.id)}
            >
              <Plus className="w-4 h-4 mr-1" />
              ADICIONAR GRUPO
            </button>
            <button 
              className="flex items-center text-[#9C27B0] text-xs"
              onClick={() => onAddRule(group.id)}
            >
              <Plus className="w-4 h-4 mr-1" />
              ADICIONAR REGRA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
