import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  className?: string;
  ref?: React.RefObject<HTMLLabelElement>;
}

const Label = ({ ref, className, ...props }: LabelProps) => {
  return <label ref={ref} className={cn(labelVariants(), className)} {...props} />;
};

export default Label;
