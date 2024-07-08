import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { RefObject } from "react";

const defaultStyle =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const buttonVariants = cva(defaultStyle, {
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-500/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      sm: "h-9 rounded-md px-3",
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

interface ButtonProps
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
