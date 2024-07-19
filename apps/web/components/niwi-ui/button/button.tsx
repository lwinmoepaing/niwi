import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { RefObject } from "react";

const defaultStyle = "niwi-button";

const buttonVariants = cva(defaultStyle, {
  variants: {
    variant: {
      primary: "niwi-button--primary",
      success: "niwi-button--success",
      outline: "niwi-button--outline",
    },
    size: {
      sm: "h-7 rounded-md px-3",
      md: "h-10 rounded-md px-4 py-2",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  ref?: RefObject<HTMLButtonElement>;
}

const Button = ({ variant, size, className, ref, ...rest }: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    />
  );
};

export default Button;
