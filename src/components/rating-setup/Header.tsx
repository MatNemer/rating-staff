
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeaderProps } from "./types";

export const Header = ({ onSaveDraft, onPublish }: HeaderProps) => {
  return (
    <div className="bg-white border flex w-full flex-col overflow-hidden items-stretch justify-center border-[rgba(224,224,224,1)] border-solid">
      <div className="flex w-full items-center overflow-hidden flex-wrap px-4">
        <div className="self-stretch flex min-h-16 min-w-60 items-center gap-6 text-xl text-black font-medium tracking-[0.15px] leading-[1.6] flex-1 shrink basis-[0%] my-auto">
          <h1 className="self-stretch my-auto">Rating setup</h1>
        </div>
        <div className="self-stretch flex min-w-60 min-h-[33px] items-center gap-4 flex-wrap my-auto">
          <div className="self-stretch flex min-w-60 items-stretch gap-2 font-normal tracking-[0.15px] h-full">
            <div className="flex min-w-60 items-center gap-2 text-base h-full">
              <label className="text-[rgba(117,117,117,1)] self-stretch my-auto">
                Ticket:
              </label>
              <Input
                className="rounded bg-white border self-stretch min-w-60 min-h-[33px] text-[#9E9E9E] w-[284px] my-auto px-3 border-[rgba(0,0,0,0.23)]"
                placeholder="Selecione um Ticket"
              />
            </div>
            <Button
              variant="outline"
              className="rounded border flex flex-col overflow-hidden items-center text-sm text-black whitespace-nowrap uppercase justify-center my-auto px-4 py-1.5 border-[rgba(0,0,0,0.12)]"
            >
              Preview
            </Button>
          </div>
          <div className="border self-stretch w-0 shrink-0 h-[33px] my-auto border-[rgba(224,224,224,1)]" />
          <div className="self-stretch flex min-w-60 items-center gap-2 text-sm text-black font-normal uppercase tracking-[0.15px] my-auto">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              className="rounded border self-stretch flex flex-col overflow-hidden items-center justify-center my-auto px-4 py-1.5 border-[rgba(0,0,0,0.12)]"
            >
              Salvar rascunho
            </Button>
            <Button
              variant="outline"
              onClick={onPublish}
              className="rounded border self-stretch flex flex-col overflow-hidden items-center whitespace-nowrap justify-center my-auto px-4 py-1.5 border-[rgba(0,0,0,0.12)]"
            >
              Publicar
            </Button>
          </div>
          <div className="border self-stretch w-0 shrink-0 h-[33px] my-auto border-[rgba(224,224,224,1)]" />
          <a 
            href="https://scipiolab.retool.com/apps/66c72b40-ee22-11ef-b34b-0f50e56e29bc/Organization%20Setup/Credit%20Limit%20Definition%20Analyzer/_main"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Button
              variant="outline"
              className="rounded border self-stretch flex min-h-[33px] flex-col overflow-hidden items-center justify-center my-auto px-4 py-1.5 border-[rgba(156,39,176,0.5)] text-[rgba(156,39,176,1)]"
            >
              <div className="flex items-stretch gap-1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/78373acc90494a24931494d3d68de37d/6dcad770ce8a0d6bf4cb307ac7bc15f8a5a9be9cea9db932cc01215ab9462543?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-5"
                />
                <span className="text-sm font-normal tracking-[0.15px] uppercase my-auto">
                  Credit Limit Analyser
                </span>
              </div>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
