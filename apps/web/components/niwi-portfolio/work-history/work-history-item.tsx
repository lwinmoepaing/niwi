import { PropsWithChildren } from "react";

export const WorkHistoryItem: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-lg bg-card text-card-foreground flex cursor-pointer my-2 relative overflow-hidden">
      {children}
    </div>
  );
};
