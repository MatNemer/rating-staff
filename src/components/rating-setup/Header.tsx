
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeaderProps } from "./types";

export const Header = ({ onSaveDraft, onPublish }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col justify-center items-start border border-[#E0E0E0] bg-white">
      <div className="flex w-full p-0 px-4 items-center">
        <div className="flex min-h-16 items-center gap-6 flex-1">
          <div className="flex flex-col items-start">
            <div className="text-[rgba(0,0,0,0.87)] font-['Roboto'] text-[20px] font-medium leading-[160%] tracking-[0.15px]">
              Rating setup
            </div>
          </div>
        </div>
        
        <div className="flex h-[33px] items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="text-[#757575] font-['Roboto'] text-base font-normal leading-[150%] tracking-[0.15px]">
                Ticket:
              </div>
              <Select defaultValue="#364 - João Da Silva Neto">
                <SelectTrigger 
                  className="w-[284px] h-[33px] px-3 flex items-center text-[#212121] font-['Roboto'] text-base font-normal leading-6 tracking-[0.15px] border border-[rgba(0,0,0,0.23)] rounded bg-white"
                >
                  <SelectValue placeholder="#364 - João Da Silva Neto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#364 - João Da Silva Neto">#364 - João Da Silva Neto</SelectItem>
                  <SelectItem value="#365 - Maria Oliveira">#365 - Maria Oliveira</SelectItem>
                  <SelectItem value="#366 - Carlos Santana">#366 - Carlos Santana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex py-1.5 px-4 flex-col justify-center items-center rounded border border-[rgba(25,118,210,0.50)]">
              <div className="flex justify-center items-center gap-2">
                <div className="text-[#1976D2] font-['Roboto'] text-sm font-normal leading-[150%] tracking-[0.15px] uppercase">
                  Preview
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-px h-[33px] bg-[#E0E0E0]"></div>
          
          <div className="flex items-center gap-2">
            <div className="flex py-1.5 px-4 flex-col justify-center items-center rounded border border-[rgba(25,118,210,0.50)]">
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={onSaveDraft}
                  className="text-[#1976D2] font-['Roboto'] text-sm font-normal leading-[150%] tracking-[0.15px] uppercase p-0 h-auto"
                >
                  Salvar rascunho
                </Button>
              </div>
            </div>
            
            <div className="flex py-1.5 px-4 flex-col justify-center items-center rounded border border-[rgba(25,118,210,0.50)]">
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={onPublish}
                  className="text-[#1976D2] font-['Roboto'] text-sm font-normal leading-[150%] tracking-[0.15px] uppercase p-0 h-auto"
                >
                  Publicar
                </Button>
              </div>
            </div>
          </div>
          
          <div className="w-px h-[33px] bg-[#E0E0E0]"></div>
          
          <a 
            href="https://scipiolab.retool.com/apps/66c72b40-ee22-11ef-b34b-0f50e56e29bc/Organization%20Setup/Credit%20Limit%20Definition%20Analyzer/_main"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <div className="flex h-[33px] py-1.5 px-4 flex-col justify-center items-center rounded border border-[rgba(156,39,176,0.50)]">
              <div className="flex items-center gap-1">
                <div className="flex items-start gap-2.5">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8333 16.3333H4.16667V4.66667H10V3H4.16667C3.24167 3 2.5 3.75 2.5 4.66667V16.3333C2.5 17.25 3.24167 18 4.16667 18H15.8333C16.75 18 17.5 17.25 17.5 16.3333V10.5H15.8333V16.3333ZM11.6667 3V4.66667H14.6583L6.46667 12.8583L7.64167 14.0333L15.8333 5.84167V8.83333H17.5V3H11.6667Z" fill="#9C27B0"></path>
                  </svg>
                </div>
                <div className="text-[#9C27B0] font-['Roboto'] text-sm font-normal leading-[150%] tracking-[0.15px] uppercase">
                  Credit Limit Analyser
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
