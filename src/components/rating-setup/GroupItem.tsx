import { useState, useMemo } from "react";
import { Group, Rule } from "./types";
import { RuleItem } from "./RuleItem";
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

  // Calculate the total score from all children items
  const totalScore = useMemo(() => {
    return group.items.reduce((sum, item) => sum + item.score, 0);
  }, [group.items]);

  return (
    <div className="w-full bg-white border border-[#E0E0E0] rounded-md">
      <div className="py-2 bg-white">
        <div className="flex items-center w-full px-4 gap-4">
          {/* Remove button */}
          <div className="p-2">
            <button 
              className="text-white"
              onClick={() => onRemove(group.id)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_12036_13531)">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H7V11H17V13Z" fill="#C62828"/>
                </g>
                <defs>
                  <clipPath id="clip0_12036_13531">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          
          {/* Group name */}
          <div className="flex-1">
            {isEditing ? (
              <div className="relative flex flex-col w-full border-2 border-[#1976D2] rounded-md">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-grow border-none px-3 h-10"
                  onBlur={handleSubmitEdit}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitEdit()}
                  autoFocus
                />
                <div className="flex h-0.5 px-1 items-center gap-2.5 relative left-3 bg-white">
                  <span className="text-xs text-[#1976D2] font-['Roboto'] leading-3 tracking-[0.15px]">
                    Informe o nome do Grupo
                  </span>
                </div>
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={handleSubmitEdit}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_12036_13541)">
                      <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM15 9H5V5H15V9Z" fill="#1976D2"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_12036_13541">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
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
                      <path d="M16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492L16.59 8.29492Z" fill="black" fillOpacity="0.56"/>
                    </svg>
                  )}
                </button>
                <div className="font-['Roboto'] text-[16px] font-normal text-black/87 leading-6 tracking-[0.15px]">
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
              </div>
            )}
          </div>

          {/* Score display (read-only) */}
          <div className="w-[80px]">
            <div className="border border-black/23 rounded-md px-3 bg-gray-50 flex items-center">
              <input
                type="text"
                className="w-full h-10 text-center text-black/38 font-['Roboto'] text-base bg-transparent outline-none cursor-not-allowed"
                value={totalScore}
                readOnly
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
