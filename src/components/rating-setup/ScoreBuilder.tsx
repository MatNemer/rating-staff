
import { useState } from "react";
import { Group, Rule, ScoreBuilderProps } from "./types";
import { GroupItem } from "./GroupItem";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export const ScoreBuilder: React.FC<ScoreBuilderProps> = ({ onAddGroup: onAddGroupProp, onAddRule: onAddRuleProp }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const addGroup = (parentId?: string) => {
    const newGroup: Group = {
      id: uuidv4(),
      name: `Grupo ${groups.length + 1}`,
      score: 100,
      type: "group",
      items: [],
      isOpen: true
    };

    if (!parentId) {
      setGroups([...groups, newGroup]);
    } else {
      const updatedGroups = addItemToGroup(groups, parentId, newGroup);
      setGroups(updatedGroups);
    }
  };

  const addRule = (parentId?: string) => {
    const newRule: Rule = {
      id: uuidv4(),
      name: `Regra ${getItemCount(groups) + 1}`,
      score: 100,
      type: "rule"
    };

    if (!parentId) {
      // Create a new top-level group containing this rule
      const newGroup: Group = {
        id: uuidv4(),
        name: `Grupo ${groups.length + 1}`,
        score: 100,
        type: "group",
        items: [newRule],
        isOpen: true
      };
      setGroups([...groups, newGroup]);
    } else {
      const updatedGroups = addItemToGroup(groups, parentId, newRule);
      setGroups(updatedGroups);
    }
  };

  const addItemToGroup = (groupList: Group[], parentId: string, newItem: Group | Rule): Group[] => {
    return groupList.map(group => {
      if (group.id === parentId) {
        return {
          ...group,
          items: [...group.items, newItem]
        };
      }
      
      if (group.items.some(item => item.type === 'group')) {
        return {
          ...group,
          items: group.items.map(item => {
            if (item.type === 'group') {
              return addItemToGroup([item as Group], parentId, newItem)[0];
            }
            return item;
          })
        };
      }
      
      return group;
    });
  };

  const removeItem = (id: string) => {
    const updatedGroups = removeItemById(groups, id);
    setGroups(updatedGroups);
  };

  const removeItemById = (groupList: Group[], id: string): Group[] => {
    return groupList.filter(group => group.id !== id).map(group => {
      return {
        ...group,
        items: group.items
          .filter(item => item.id !== id)
          .map(item => {
            if (item.type === 'group') {
              return {
                ...item,
                items: removeItemById([item as Group], id)[0]?.items || []
              } as Group;
            }
            return item;
          })
      };
    });
  };

  const updateScore = (id: string, score: number) => {
    const updatedGroups = updateItemScore(groups, id, score);
    setGroups(updatedGroups);
  };

  const updateItemScore = (groupList: Group[], id: string, score: number): Group[] => {
    return groupList.map(group => {
      if (group.id === id) {
        return { ...group, score };
      }
      
      return {
        ...group,
        items: group.items.map(item => {
          if (item.id === id) {
            return { ...item, score };
          }
          
          if (item.type === 'group') {
            return updateItemScore([item as Group], id, score)[0];
          }
          
          return item;
        })
      };
    });
  };

  const toggleGroup = (id: string) => {
    const updatedGroups = toggleGroupOpen(groups, id);
    setGroups(updatedGroups);
  };

  const toggleGroupOpen = (groupList: Group[], id: string): Group[] => {
    return groupList.map(group => {
      if (group.id === id) {
        return { ...group, isOpen: !group.isOpen };
      }
      
      return {
        ...group,
        items: group.items.map(item => {
          if (item.type === 'group') {
            return toggleGroupOpen([item as Group], id)[0];
          }
          return item;
        })
      };
    });
  };

  const editItem = (id: string) => {
    // In a real implementation, this would show a modal or form to edit the item
    console.log(`Edit item with id: ${id}`);
  };

  const getItemCount = (groupList: Group[]): number => {
    let count = 0;
    
    groupList.forEach(group => {
      group.items.forEach(item => {
        count++;
        if (item.type === 'group') {
          count += getItemCount([item as Group]);
        }
      });
    });
    
    return count;
  };

  return (
    <div className="flex flex-col w-full">
      {groups.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2 w-full py-4 rounded-md border border-[#E0E0E0] bg-white">
          <div className="flex p-2 items-center gap-2.5 rounded bg-[#EEE]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_11906_40993)">
                <path d="M19 6V16.5L20.95 18.45C20.98 18.3 21 18.15 21 18V6C21 4.9 20.1 4 19 4H6.5L8.5 6H19Z" fill="#323232"/>
                <path d="M3.2202 3.32031L1.9502 4.59031L3.0002 5.64031V18.0003C3.0002 19.1003 3.9002 20.0003 5.0002 20.0003H17.3602L19.4202 22.0603L20.6902 20.7903L3.2202 3.32031ZM15.0002 18.0003H5.0002V7.64031L15.3602 18.0003H15.0002Z" fill="#323232"/>
              </g>
              <defs>
                <clipPath id="clip0_11906_40993">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="text-[#757575] text-sm">
            Nenhum grupo adicionado até o momento
          </div>
        </div>
      ) : (
        <div className="w-full">
          {groups.map((group) => (
            <GroupItem
              key={group.id}
              group={group}
              onRemove={removeItem}
              onScoreChange={updateScore}
              onEdit={editItem}
              onAddGroup={addGroup}
              onAddRule={addRule}
              onToggle={toggleGroup}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-4 mt-4">
        <button 
          className="flex p-[6px_16px] justify-center items-center rounded bg-[#1976D2] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)] relative cursor-pointer transition-all duration-200"
          onClick={() => addGroup()}
        >
          <div className="flex justify-center items-center gap-2 relative">
            <div className="flex min-h-6 py-0.5 justify-center items-center relative">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div className="text-white font-['Roboto, sans-serif'] text-sm font-medium leading-6 tracking-[0.4px] uppercase">
              Adicionar grupo
            </div>
          </div>
        </button>

        <button 
          className="flex p-[6px_16px] justify-center items-center rounded bg-[#9C27B0] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)] relative cursor-pointer transition-all duration-200"
          onClick={() => addRule()}
        >
          <div className="flex justify-center items-center gap-2 relative">
            <div className="flex min-h-6 py-0.5 justify-center items-center relative">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div className="text-white font-['Roboto, sans-serif'] text-sm font-medium leading-6 tracking-[0.4px] uppercase">
              Adicionar Regra
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
