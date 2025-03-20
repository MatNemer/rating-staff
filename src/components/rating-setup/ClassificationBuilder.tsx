
import { useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { PlusIcon } from "lucide-react";

interface ClassificationCriteria {
  id: string;
  condition: string;
  value: number;
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
    // Add new criteria logic
    console.log("Add new grade clicked");
  };

  const confirmDelete = (id: string) => {
    setCriteriaToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteCriteria = () => {
    if (criteriaToDelete) {
      setCriteria(criteria.filter(item => item.id !== criteriaToDelete));
    }
    setShowDeleteDialog(false);
    setCriteriaToDelete(null);
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
              <div className="w-[204px] text-[#212121] font-['Roboto'] text-sm">
                Intervalos de Critérios
              </div>
              <div className="w-[184px] text-[#212121] font-['Roboto'] text-sm">
                Resultado
              </div>
            </div>

            {/* Criteria Rows */}
            <div className="flex flex-col items-start gap-3 w-full">
              {criteria.map((item) => (
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
                    <div className="flex px-3 w-full rounded border border-[rgba(0,0,0,0.23)]">
                      <div className="flex py-2 items-center w-full">
                        <div className="flex-1 text-[rgba(0,0,0,0.60)] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px]">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex h-10 p-[5px] justify-center items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.01 11H4V13H16.01V16L20 12L16.01 8V11Z" fill="#6B7280"/>
                    </svg>
                  </div>
                  
                  {/* Result */}
                  <div className="flex w-[184px] bg-white">
                    <div className="flex px-3 w-full rounded border border-[rgba(0,0,0,0.23)]">
                      <div className="flex py-2 items-center w-full">
                        <div className="flex-1 text-[rgba(0,0,0,0.60)] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px]">
                          {item.result}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button 
                    className="w-5 h-5"
                    onClick={() => confirmDelete(item.id)}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_12080_32986)">
                        <path d="M10.0003 1.66602C5.40033 1.66602 1.66699 5.39935 1.66699 9.99935C1.66699 14.5993 5.40033 18.3327 10.0003 18.3327C14.6003 18.3327 18.3337 14.5993 18.3337 9.99935C18.3337 5.39935 14.6003 1.66602 10.0003 1.66602ZM14.167 10.8327H5.83366V9.16602H14.167V10.8327Z" fill="#C62828"/>
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
                  <div className="flex px-3 w-full rounded border border-[rgba(0,0,0,0.23)]">
                    <div className="flex min-h-6 py-2 items-center w-full">
                      <div className="flex-1 text-[rgba(0,0,0,0.60)] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px]">
                        {item.limitPercentage}
                      </div>
                    </div>
                  </div>
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
        <button className="flex p-[6px_16px] justify-center items-center rounded bg-[#1976D2] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)]">
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
