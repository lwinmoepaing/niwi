import { cn } from "@/libs/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LegacyRef } from "react";

const defaultStyle =
  "flex h-10 w-full px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const inputVariants = cva(defaultStyle, {
  variants: {
    variant: {
      solid: "bg-[#dfdfdf]",
      outline: "border border-input",
    },
    textSize: {
      sm: "text-xs h-8",
      md: "text-sm h-10",
      lg: "text-lg h-12",
    },
    rounded: {
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
  defaultVariants: {
    variant: "outline",
    rounded: "md",
    textSize: "md",
  },
});

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  className?: string;
  ref?: LegacyRef<HTMLInputElement>;
}

const TextInput = ({
  variant,
  textSize,
  rounded,
  className,
  ref,
  ...rest
}: TextInputProps) => {
  return (
    <input
      ref={ref}
      className={cn(inputVariants({ variant, textSize, rounded, className }))}
      {...rest}
    />
  );
};

export default TextInput;
