import { cn } from "@/libs/utils";

type H2Props = {
  className?: string;
  children: React.ReactNode;
};

const H2 = ({ children, className = "" }: H2Props) => {
  return <h2 className={cn("", className)}>{children}</h2>;
};

export default H2;