
import { useState, useEffect } from "react";
import { Group, Rule } from "./types";
import { GroupItem } from "./GroupItem";
import { v4 as uuidv4 } from "uuid";

export const ScoreBuilder = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: uuidv4(),
      name: "Histórico Comercial",
      score: 100,
      expanded: true,
      items: [
        {
          id: uuidv4(),
          name: "Regra 1",
          score: 100
        },
        {
          id: uuidv4(),
          name: "Regra 2",
          score: 100
        },
        {
          id: uuidv4(),
          name: "Regra 3",
          score: 100
        },
        {
          id: uuidv4(),
          name: "Liquidez",
          score: 100,
          expanded: true,
          items: [
            {
              id: uuidv4(),
              name: "Regra de Liquidez 1",
              score: 100
            },
            {
              id: uuidv4(),
              name: "Regra de Liquidez 2",
              score: 100
            },
            {
              id: uuidv4(),
              name: "Regra de Liquidez 3",
              score: 100
            },
            {
              id: uuidv4(),
              name: "Grupo de Liquidez",
              score: 100,
              expanded: true,
              items: []
            }
          ]
        }
      ]
    }
  ]);

  // This effect updates group scores based on their children's scores
  useEffect(() => {
    const updateGroupScores = (items: (Group | Rule)[]): (Group | Rule)[] => {
      return items.map(item => {
        if ('items' in item) {
          const updatedItems = updateGroupScores(item.items);
          const totalScore = updatedItems.reduce((sum, child) => sum + child.score, 0);
          return {
            ...item,
            items: updatedItems,
            score: totalScore
          };
        }
        return item;
      });
    };

    setGroups(prevGroups => updateGroupScores(prevGroups) as Group[]);
  }, [groups]);

  const handleAddTopLevelGroup = () => {
    const newGroup: Group = {
      id: uuidv4(),
      name: "Novo Grupo",
      score: 0,
      items: [],
      expanded: true
    };
    setGroups([...groups, newGroup]);
  };

  const handleAddTopLevelRule = () => {
    const newRule: Rule = {
      id: uuidv4(),
      name: "Nova Regra",
      score: 0
    };
    // Rules can't have children so we just add it to the array
    // This is required for the top level only
    setGroups([...groups, newRule as any]);
  };

  const findAndAddItem = (items: (Group | Rule)[], parentId: string, newItem: Group | Rule): (Group | Rule)[] => {
    return items.map(item => {
      if (item.id === parentId && 'items' in item) {
        return {
          ...item,
          items: [...(item as Group).items, newItem]
        };
      } else if ('items' in item) {
        return {
          ...item,
          items: findAndAddItem((item as Group).items, parentId, newItem)
        };
      }
      return item;
    });
  };

  const handleAddGroup = (parentId: string) => {
    const newGroup: Group = {
      id: uuidv4(),
      name: "Novo Grupo",
      score: 0,
      items: [],
      expanded: true
    };
    
    setGroups(prevGroups => findAndAddItem(prevGroups as Group[], parentId, newGroup) as Group[]);
  };

  const handleAddRule = (parentId: string) => {
    const newRule: Rule = {
      id: uuidv4(),
      name: "Nova Regra",
      score: 0
    };
    
    setGroups(prevGroups => findAndAddItem(prevGroups as Group[], parentId, newRule) as Group[]);
  };

  const handleRemoveItem = (id: string) => {
    const filterItems = (items: (Group | Rule)[]): (Group | Rule)[] => {
      return items
        .filter(item => item.id !== id)
        .map(item => {
          if ('items' in item) {
            return {
              ...item,
              items: filterItems((item as Group).items)
            };
          }
          return item;
        });
    };
    
    setGroups(prevGroups => filterItems(prevGroups) as Group[]);
  };

  const handleUpdateItem = (id: string, updates: Partial<Group | Rule>) => {
    const updateItems = (items: (Group | Rule)[]): (Group | Rule)[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        } else if ('items' in item) {
          return {
            ...item,
            items: updateItems((item as Group).items)
          };
        }
        return item;
      });
    };
    
    setGroups(prevGroups => updateItems(prevGroups) as Group[]);
  };

  const handleScoreChange = (id: string, score: number) => {
    handleUpdateItem(id, { score });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mb-4 border border-[#E0E0E0] rounded-md w-full">
        {groups.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-2 py-6">
            <div className="p-2 bg-[#EEE] rounded">
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
            <div className="text-[#757575] font-['Roboto'] text-sm">
              Nenhum grupo adicionado até o momento
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map(item => 
              'items' in item ? (
                <GroupItem
                  key={item.id}
                  group={item as Group}
                  onAddGroup={handleAddGroup}
                  onAddRule={handleAddRule}
                  onRemove={handleRemoveItem}
                  onUpdate={handleUpdateItem}
                  onScoreChange={handleScoreChange}
                />
              ) : null
            )}
          </div>
        )}
      </div>

      <div className="flex items-start gap-4">
        <button 
          className="flex p-[6px_16px] justify-center items-center gap-2 rounded bg-[#1976D2] text-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)]"
          onClick={handleAddTopLevelGroup}
        >
          <div className="flex min-h-6 py-0.5 justify-center items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8337 10.8337H10.8337V15.8337H9.16699V10.8337H4.16699V9.16699H9.16699V4.16699H10.8337V9.16699H15.8337V10.8337Z" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-['Roboto'] text-sm font-medium leading-6 tracking-[0.4px] uppercase">
            Adicionar grupo
          </span>
        </button>

        <button 
          className="flex p-[6px_16px] justify-center items-center gap-2 rounded bg-[#9C27B0] text-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)]"
          onClick={handleAddTopLevelRule}
        >
          <div className="flex min-h-6 py-0.5 justify-center items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8337 10.8337H10.8337V15.8337H9.16699V10.8337H4.16699V9.16699H9.16699V4.16699H10.8337V9.16699H15.8337V10.8337Z" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-['Roboto'] text-sm font-medium leading-6 tracking-[0.4px] uppercase">
            Adicionar Regra
          </span>
        </button>
      </div>
    </div>
  );
};
