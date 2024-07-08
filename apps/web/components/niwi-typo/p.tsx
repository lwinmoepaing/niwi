import { cn } from "@/libs/utils";

type ParagraphProps = {
  className?: string;
  children: React.ReactNode;
};

const P = ({ children, className = "" }: ParagraphProps) => {
  return <p className={cn("", className)}>{children}</p>;
};

export default P;