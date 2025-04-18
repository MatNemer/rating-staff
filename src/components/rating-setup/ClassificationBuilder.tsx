
import { useState, KeyboardEvent } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { Input } from "../ui/input";

interface ClassificationCriteria {
  id: string;
  condition: string;
  value: number | string;
  result: string;
  limitPercentage: string;
}

export const ClassificationBuilder = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [criteriaToDelete, setCriteriaToDelete] = useState<string | null>(null);
  
  const [criteria, setCriteria] = useState<ClassificationCriteria[]>([
    { id: "1", condition: "maior que", value: 90, result: "A", limitPercentage: "100%" },
    { id: "2", condition: "maior que", value: 80, result: "B", limitPercentage: "80%" },
    { id: "3", condition: "maior que", value: 60, result: "C", limitPercentage: "70%" },
    { id: "4", condition: "maior que", value: 50, result: "D", limitPercentage: "40%" },
    { id: "5", condition: "maior que", value: 40, result: "E", limitPercentage: "20%" },
    { id: "6", condition: "menor ou igual a", value: 40, result: "F", limitPercentage: "0%" }
  ]);

  const handleAddGrade = () => {
    const lastItem = criteria[criteria.length - 2]; // Get the second-to-last item
    const newId = String(Number(criteria[criteria.length - 1].id) + 1);
    
    // Ensure we're working with numbers for arithmetic operations
    const lastItemValue = typeof lastItem.value === 'string' 
      ? parseFloat(lastItem.value) 
      : lastItem.value;
    
    // Create a new criteria with value slightly below the last "maior que" criteria
    const newValue = lastItemValue - 10;
    const newCriteria = {
      id: newId,
      condition: "maior que",
      value: newValue,
      result: String.fromCharCode(lastItem.result.charCodeAt(0) + 1),
      limitPercentage: "0%"
    };
    
    // Add the new criteria as the second-to-last item
    const newCriteriaList = [...criteria.slice(0, -1), newCriteria, criteria[criteria.length - 1]];
    
    // Update the "menor ou igual a" criteria to match the new lowest "maior que" value
    newCriteriaList[newCriteriaList.length - 1].value = newValue;
    
    setCriteria(newCriteriaList);
  };

  const confirmDelete = (id: string) => {
    setCriteriaToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteCriteria = () => {
    if (criteriaToDelete) {
      const newCriteria = criteria.filter(item => item.id !== criteriaToDelete);
      
      // If the last "maior que" item was deleted, update the "menor ou igual a" value
      if (newCriteria.length > 1) {
        const lastMaiorQueIndex = newCriteria.length - 2;
        newCriteria[newCriteria.length - 1].value = newCriteria[lastMaiorQueIndex].value;
      }
      
      setCriteria(newCriteria);
    }
    setShowDeleteDialog(false);
    setCriteriaToDelete(null);
  };

  // Modified to handle string values
  const handleValueChange = (id: string, newValue: string) => {
    // Only allow numbers and decimal points
    if (newValue !== "" && !/^[0-9]*\.?[0-9]*$/.test(newValue)) {
      return;
    }

    const updatedCriteria = criteria.map(item => {
      if (item.id === id) {
        return { ...item, value: newValue === "" ? "" : newValue };
      }
      return item;
    });
    
    // If the last "maior que" item was changed, update the "menor ou igual a" value
    const lastMaiorQueIndex = updatedCriteria.length - 2;
    if (id === updatedCriteria[lastMaiorQueIndex].id) {
      updatedCriteria[updatedCriteria.length - 1].value = updatedCriteria[lastMaiorQueIndex].value;
    }
    
    setCriteria(updatedCriteria);
  };

  const handleResultChange = (id: string, newResult: string) => {
    setCriteria(criteria.map(item => 
      item.id === id ? { ...item, result: newResult } : item
    ));
  };

  const handleLimitPercentageChange = (id: string, newPercentage: string) => {
    // Only allow numbers and decimal points
    if (newPercentage !== "" && !/^[0-9]*\.?[0-9]*$/.test(newPercentage)) {
      return;
    }

    setCriteria(criteria.map(item => {
      if (item.id === id) {
        // Store the raw numeric value without % symbol for editing
        return { ...item, limitPercentage: newPercentage };
      }
      return item;
    }));
  };

  // Format percentage for display (add % symbol)
  const formatPercentage = (value: string): string => {
    if (value === "") return "";
    
    // Don't add % if it already ends with %
    if (value.endsWith("%")) return value;
    
    return `${value}%`;
  };

  // Handle Enter key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string, field: 'value' | 'result' | 'limitPercentage') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur(); // Remove focus to trigger onBlur

      // For percentage fields, format when saving with Enter
      if (field === 'limitPercentage') {
        const newValue = formatPercentage(e.currentTarget.value);
        setCriteria(criteria.map(item => 
          item.id === id ? { ...item, limitPercentage: newValue } : item
        ));
      }
    }
  };

  // Format percentage on blur
  const handlePercentageBlur = (id: string, value: string) => {
    const formattedValue = formatPercentage(value);
    setCriteria(criteria.map(item => 
      item.id === id ? { ...item, limitPercentage: formattedValue } : item
    ));
  };

  const handleSave = () => {
    // Format all percentages with % before saving
    const formattedCriteria = criteria.map(item => ({
      ...item, 
      limitPercentage: formatPercentage(item.limitPercentage)
    }));
    
    console.log("Saving criteria:", formattedCriteria);
    // Logic to save criteria
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full mt-4">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start gap-1">
          <div className="text-[rgba(0,0,0,0.87)] font-['Roboto'] text-base font-bold leading-[160%] tracking-[0.15px]">
            Critérios de Classificação
          </div>
          <div className="text-[#757575] font-['Roboto'] text-sm font-normal leading-[157%] tracking-[0.1px]">
            Defina os critérios de classificação que estão sendo implementado
          </div>
        </div>
        <div className="flex p-[6px_16px] justify-center items-center rounded bg-[#9C27B0] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)]">
          <div className="text-white font-['Roboto'] text-sm font-normal leading-6 tracking-[0.4px] uppercase">
            Usar critérios Tarken
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex p-4 flex-col items-start gap-[14px] w-full rounded-lg border border-[#E0E0E0] bg-white">
        <div className="flex items-start gap-8 w-full">
          <div className="flex flex-col items-start gap-[10px] flex-1">
            {/* Header Row */}
            <div className="flex items-start gap-3 w-full">
              <div className="w-[204px]"></div>
              <div className="w-[184px] text-[#212121] font-['Roboto'] text-sm">
                Intervalos de Critérios
              </div>
              <div className="flex-1"></div>
              <div className="text-[#212121] font-['Roboto'] text-sm w-[184px] text-left">
                Resultado
              </div>
              <div className="w-5"></div>
            </div>

            {/* Criteria Rows */}
            <div className="flex flex-col items-start gap-3 w-full">
              {criteria.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 w-full">
                  {/* Condition */}
                  <div className="flex w-[204px] bg-[#F8F9FC]">
                    <div className="flex px-3 w-full rounded border border-[rgba(0,0,0,0.23)]">
                      <div className="flex py-2 items-center w-full">
                        <div className="flex-1 text-[rgba(0,0,0,0.60)] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px]">
                          {item.condition}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Value */}
                  <div className="flex w-[184px] bg-white">
                    <Input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleValueChange(item.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, item.id, 'value')}
                      disabled={index === criteria.length - 1} // Disable the last row (menor ou igual a)
                      className="w-full border-[rgba(0,0,0,0.23)] text-[rgba(0,0,0,0.60)] font-['Roboto']"
                    />
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex h-10 p-[5px] justify-center items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="#6B7280"/>
                    </svg>
                  </div>
                  
                  {/* Result */}
                  <div className="flex w-[184px] bg-white">
                    <Input
                      type="text"
                      value={item.result}
                      onChange={(e) => handleResultChange(item.id, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, item.id, 'result')}
                      className="w-full border-[rgba(0,0,0,0.23)] text-[rgba(0,0,0,0.60)] font-['Roboto']"
                    />
                  </div>
                  
                  {/* Delete Button */}
                  <button 
                    className="w-5 h-5"
                    onClick={() => confirmDelete(item.id)}
                    disabled={criteria.length <= 2} // Disable deletion when only 2 items remain
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_12080_32986)">
                        <path d="M10.0003 1.66602C5.40033 1.66602 1.66699 5.39935 1.66699 9.99935C1.66699 14.5993 5.40033 18.3327 10.0003 18.3327C14.6003 18.3327 18.3337 14.5993 18.3337 9.99935C18.3337 5.39935 14.6003 1.66602 10.0003 1.66602ZM14.167 10.8327H5.83366V9.16602H14.167V10.8327Z" fill={criteria.length <= 2 ? "#CCCCCC" : "#C62828"}/>
                      </g>
                      <defs>
                        <clipPath id="clip0_12080_32986">
                          <rect width="20" height="20" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              ))}

              {/* Add Grade Button */}
              <div className="flex items-start gap-3 w-full">
                <div 
                  className="flex w-[556px] p-[4px_5px] justify-center items-center gap-2 rounded border border-dashed border-[#E1E6EF] bg-[#F8F9FC] cursor-pointer"
                  onClick={handleAddGrade}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" fill="#1976D2"/>
                  </svg>
                  <div className="text-[#1976D2] font-['Roboto'] text-[13px] font-normal leading-[22px] tracking-[0.46px] uppercase">
                    Adicionar Grade
                  </div>
                </div>
                <div className="flex w-[41px] p-[4px_5px] justify-center items-center gap-2 rounded border border-dashed border-[#E1E6EF] bg-[#F8F9FC]">
                </div>
              </div>
            </div>
          </div>

          {/* Limit Percentages */}
          <div className="w-[158px] flex flex-col items-start gap-[10px]">
            <div className="h-4 w-full text-[#212121] font-['Roboto'] text-sm font-normal">
              % para Limite Sugerido
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              {criteria.map((item) => (
                <div key={`limit-${item.id}`} className="flex flex-col items-start w-full">
                  <Input
                    type="text"
                    value={item.limitPercentage.replace(/%$/, '')} // Remove % for editing
                    onChange={(e) => handleLimitPercentageChange(item.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, item.id, 'limitPercentage')}
                    onBlur={(e) => handlePercentageBlur(item.id, e.target.value)}
                    className="w-full border-[rgba(0,0,0,0.23)] text-[rgba(0,0,0,0.60)] font-['Roboto']"
                  />
                </div>
              ))}
              
              <div className="flex items-start gap-3 w-full">
                <div className="flex p-[4px_5px] justify-center items-center gap-2 flex-1 rounded border border-dashed border-[#E1E6EF] bg-[#F8F9FC]">
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button 
          className="flex p-[6px_16px] justify-center items-center rounded bg-[#1976D2] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)]"
          onClick={handleSave}
        >
          <div className="text-white font-['Roboto'] text-sm font-normal leading-6 tracking-[0.4px] uppercase">
            Salvar
          </div>
        </button>
      </div>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteCriteria}
        title="Confirmar exclusão"
        description="Esta ação não pode ser desfeita. Tem certeza que deseja excluir este critério?"
      />
    </div>
  );
};
