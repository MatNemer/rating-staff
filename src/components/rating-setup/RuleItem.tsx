
import { useState } from "react";
import { Rule } from "./types";
import { Edit, MinusCircle } from "lucide-react";
import { Input } from "../ui/input";

interface RuleItemProps {
  rule: Rule;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Rule>) => void;
  onScoreChange: (id: string, score: number) => void;
}

export const RuleItem = ({ 
  rule, 
  onRemove, 
  onUpdate,
  onScoreChange
}: RuleItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(rule.name);

  const handleSubmitEdit = () => {
    onUpdate(rule.id, { name });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center w-full mb-2">
      <button 
        className="mr-2 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
        onClick={() => onRemove(rule.id)}
      >
        <MinusCircle className="w-4 h-4" />
      </button>
      
      {isEditing ? (
        <div className="flex-grow">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow"
            onBlur={handleSubmitEdit}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitEdit()}
            autoFocus
            placeholder="Informe o nome da Regra"
          />
        </div>
      ) : (
        <div className="flex-grow flex items-center">
          <div className="font-medium">{rule.name}</div>
          <button
            className="ml-2"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

      <div className="flex items-center ml-auto">
        <Input
          type="number"
          className="w-20 h-9 text-center"
          value={rule.score}
          onChange={(e) => onScoreChange(rule.id, parseInt(e.target.value) || 0)}
        />
        
        <button className="flex h-9 w-9 items-center justify-center ml-1">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 8H8V4H10V8H14V10H10V14H8V10H4V8ZM16 4V6H20V10H22V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H16ZM20 16H22V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H16V20H20V16ZM10 20V16H8V20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4V8H18V4H4V18H8V20H10Z" fill="#757575"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
