
import { useState } from "react";
import { Rule } from "./types";
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
  const [score, setScore] = useState(rule.score.toString());

  const handleSubmitEdit = () => {
    onUpdate(rule.id, { name });
    setIsEditing(false);
  };

  const handleScoreChange = (value: string) => {
    setScore(value);
    // If empty string, set to 0
    const numValue = value === '' ? 0 : parseInt(value);
    onScoreChange(rule.id, numValue);
  };

  return (
    <div className="flex items-center w-full p-2 rounded-md bg-[#F5F5F5] gap-2">
      <div className="p-2">
        <button 
          onClick={() => onRemove(rule.id)}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_12036_19340)">
              <path d="M12 2.48438C6.48 2.48438 2 6.96438 2 12.4844C2 18.0044 6.48 22.4844 12 22.4844C17.52 22.4844 22 18.0044 22 12.4844C22 6.96438 17.52 2.48438 12 2.48438ZM17 13.4844H7V11.4844H17V13.4844Z" fill="#C62828"/>
            </g>
            <defs>
              <clipPath id="clip0_12036_19340">
                <rect width="24" height="24" fill="white" transform="translate(0 0.484375)"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      
      {isEditing ? (
        <div className="flex-grow">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow bg-white"
            onBlur={handleSubmitEdit}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitEdit()}
            autoFocus
            placeholder="Informe o nome da Regra"
          />
        </div>
      ) : (
        <div className="flex-grow">
          <div className="font-['Roboto'] text-[16px] text-[#212121] leading-[160%] tracking-[0.15px]">
            {rule.name}
          </div>
        </div>
      )}

      <div className="w-[80px]">
        <div className="border border-black/23 rounded-md bg-white px-3 flex items-center">
          <input
            type="text"
            inputMode="numeric"
            className="w-full h-10 text-center text-[#212121] font-['Roboto'] text-base bg-transparent outline-none"
            value={score}
            onChange={(e) => handleScoreChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center items-center w-10 h-10">
        <button
          onClick={() => setIsEditing(true)}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_12036_19357)">
              <path d="M14 4.48438H10V8.48438H14V4.48438Z" fill="#424242"/>
              <path d="M8 16.4844H4V20.4844H8V16.4844Z" fill="#424242"/>
              <path d="M8 10.4844H4V14.4844H8V10.4844Z" fill="#424242"/>
              <path d="M8 4.48438H4V8.48438H8V4.48438Z" fill="#424242"/>
              <path d="M14 12.9044V10.4844H10V14.4844H12.42L14 12.9044Z" fill="#424242"/>
              <path d="M20.88 11.7744L19.71 10.6044C19.55 10.4444 19.29 10.4444 19.13 10.6044L18.25 11.4844L20 13.2344L20.88 12.3544C21.04 12.1944 21.04 11.9344 20.88 11.7744Z" fill="#424242"/>
              <path d="M11 18.7345V20.4845H12.75L19.42 13.8145L17.67 12.0645L11 18.7345Z" fill="#424242"/>
              <path d="M20 4.48438H16V8.48438H20V4.48438Z" fill="#424242"/>
            </g>
            <defs>
              <clipPath id="clip0_12036_19357">
                <rect width="24" height="24" fill="white" transform="translate(0 0.484375)"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};
