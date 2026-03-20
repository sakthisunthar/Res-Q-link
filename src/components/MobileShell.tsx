import { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
}

const MobileShell = ({ children }: MobileShellProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] min-h-[700px] max-h-[844px] bg-card rounded-[2rem] shadow-2xl shadow-foreground/10 overflow-hidden relative flex flex-col border border-border">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold text-foreground">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-foreground/60 rounded-sm relative">
              <div className="absolute inset-[1px] right-[3px] bg-foreground/60 rounded-[1px]" />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileShell;
