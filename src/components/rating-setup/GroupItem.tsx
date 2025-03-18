
import { useState } from "react";
import { Group, Rule } from "./types";
import { RuleItem } from "./RuleItem";
import { Plus } from "lucide-react";
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
    <div className="w-full bg-white border border-[#E0E0E0] rounded-md">
      <div className="py-2 bg-white">
        <div className="flex items-center w-full px-4">
          {/* Remove button */}
          <div className="p-2">
            <button 
              className="text-white"
              onClick={() => onRemove(group.id)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_11946_13152)">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H7V11H17V13Z" fill="#C62828"/>
                </g>
                <defs>
                  <clipPath id="clip0_11946_13152">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          
          {/* Group name */}
          <div className="flex items-center flex-grow gap-2">
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8.29492L6 14.2949L7.41 15.7049L12 11.1249L16.59 15.7049L18 14.2949L12 8.29492Z" fill="black" fillOpacity="0.56"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z" fill="black" fillOpacity="0.56"/>
                    </svg>
                  )}
                </button>
                <div className="font-['Roboto'] text-[16px] font-semibold text-black/87 leading-[25.6px] tracking-[0.15px]">
                  {group.name}
                </div>
                <button
                  className="p-2 rounded-full"
                  onClick={() => setIsEditing(true)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.99902 17.2505V21.0005H6.74902L17.809 9.94055L14.059 6.19055L2.99902 17.2505ZM20.709 7.04055C21.099 6.65055 21.099 6.02055 20.709 5.63055L18.369 3.29055C17.979 2.90055 17.349 2.90055 16.959 3.29055L15.129 5.12055L18.879 8.87055L20.709 7.04055Z" fill="#BDBDBD"/>
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Score input */}
          <div className="w-[80px]">
            <div className="border border-black/23 rounded-md px-3">
              <input
                type="number"
                className="w-full h-10 text-center text-black/38 font-['Roboto'] text-base bg-transparent outline-none"
                value={group.score}
                onChange={(e) => onScoreChange(group.id, parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
      </div>

      {group.expanded && (
        <div className="px-4 pb-4 pt-2 space-y-2">
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

          <div className="flex space-x-4 mt-2">
            <button 
              className="flex items-center gap-2 text-[#1976D2] text-xs px-[5px] py-1"
              onClick={() => onAddGroup(group.id)}
            >
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.25 10.6914H9.75V15.1914H8.25V10.6914H3.75V9.19141H8.25V4.69141H9.75V9.19141H14.25V10.6914Z" fill="#1976D2"/>
              </svg>
              <span className="font-['Roboto'] text-[13px] font-medium tracking-[0.46px] uppercase">
                ADICIONAR GRUPO
              </span>
            </button>
            <button 
              className="flex items-center gap-2 text-[#9C27B0] text-xs px-[5px] py-1"
              onClick={() => onAddRule(group.id)}
            >
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.25 10.6914H9.75V15.1914H8.25V10.6914H3.75V9.19141H8.25V4.69141H9.75V9.19141H14.25V10.6914Z" fill="#9C27B0"/>
              </svg>
              <span className="font-['Roboto'] text-[13px] font-medium tracking-[0.46px] uppercase">
                ADICIONAR REGRA
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
