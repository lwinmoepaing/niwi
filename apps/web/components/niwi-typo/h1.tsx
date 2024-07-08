import { cn } from "@/libs/utils";

type H1Props = {
  className?: string;
  children: React.ReactNode;
};

const H1 = ({ children, className = "" }: H1Props) => {
  return <h1 className={cn("", className)}>{children}</h1>;
};

export default H1;
