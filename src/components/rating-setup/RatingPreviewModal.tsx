
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface RatingPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RatingPreviewModal: React.FC<RatingPreviewModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[965px] p-0">
        <div className="flex flex-col items-start w-full border-radius-4px">
          <div className="flex flex-col items-start w-full">
            <div className="flex p-4 md:p-6 flex-col items-start w-full">
              <div className="w-full text-[rgba(0,0,0,0.87)] font-['Roboto'] text-xl font-medium leading-[160%] tracking-[0.15px]">
                Preview de Rating
              </div>
            </div>
            
            <div className="flex px-4 md:px-6 flex-col items-start gap-4 w-full">
              <div className="flex items-center gap-4 md:gap-10 w-full flex-col sm:flex-row">
                <div className="flex items-baseline gap-2">
                  <div className="text-[#6B6B6B] font-['Roboto'] text-sm font-semibold leading-[160%] uppercase">
                    Rating:
                  </div>
                  <div className="text-[rgba(0,0,0,0.87)] font-['Roboto'] text-2xl font-medium leading-[160%]">
                    A+
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-[#6B6B6B] font-['Roboto'] text-sm font-semibold leading-[160%] uppercase">
                    Limite Sugerido:
                  </div>
                  <div className="text-[rgba(0,0,0,0.87)] font-['Roboto'] text-2xl font-medium leading-[160%]">
                    R$ 200.000,00
                  </div>
                </div>
              </div>
              
              <div className="flex p-4 justify-between items-start gap-3.5 w-full rounded-lg border border-[#E0E0E0] bg-white">
                <div className="flex flex-col items-start gap-2.5 flex-1">
                  <div className="text-[#212121] font-['Roboto'] text-sm font-medium leading-6 w-full">
                    Critérios
                  </div>
                  <div className="flex flex-col items-start gap-3 w-full">
                    {[
                      "PONTUAÇÃO TOTAL (Grade)",
                      "Histórico Comercial",
                      "Tempo na Atividade",
                      "Conceito Com.",
                      "Desflorestamento",
                      "Moratória da Soja",
                      "Criminal",
                      "Prop. de Áreas",
                      "Risco Região"
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-start w-full">
                        <div className="flex px-3 flex-col items-start w-full rounded border border-[rgba(0,0,0,0.23)]">
                          <div className="flex min-h-6 py-2 items-center w-full">
                            <div className="flex-1 text-[rgba(0,0,0,0.6)] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px]">
                              {item}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 flex-1">
                  <div className="text-[#212121] font-['Roboto'] text-sm font-medium leading-6 w-full">
                    Nota
                  </div>
                  <div className="flex flex-col items-start gap-3 w-full">
                    {[
                      "90", "15", "10", "8", "8", "8", "8", "12", "21"
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-start w-full">
                        <div className="flex px-3 flex-col items-start w-full rounded border border-[rgba(0,0,0,0.23)]">
                          <div className="flex min-h-6 py-2 items-center w-full">
                            <div className="flex-1 text-[rgba(0,0,0,0.6)] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px]">
                              {item}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 flex-1">
                  <div className="text-[#212121] font-['Roboto'] text-sm font-medium leading-6 w-full">
                    Valor
                  </div>
                  <div className="flex flex-col items-start gap-3 w-full">
                    {[
                      "-",
                      "Entre 1 e 14 dias",
                      "Acima de 10 anos",
                      "Bom",
                      "Conforme",
                      "Conforme",
                      "Conforme",
                      "100 de áreas próprias",
                      "Muito baixo"
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-start w-full">
                        <div className="flex px-3 flex-col items-start w-full rounded border border-[rgba(0,0,0,0.23)]">
                          <div className="flex min-h-6 py-2 items-center w-full">
                            <div className="flex-1 text-[rgba(0,0,0,0.6)] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px]">
                              {item}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-2 justify-end items-center gap-2 w-full">
            <div 
              className="flex px-2 py-1.5 justify-center items-center rounded cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              <div className="flex justify-center items-center gap-2">
                <div className="text-[#1976D2] font-['Roboto'] text-sm font-medium leading-6 tracking-[0.4px] uppercase">
                  Dispensar
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
