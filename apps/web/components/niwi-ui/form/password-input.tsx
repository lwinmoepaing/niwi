import * as React from "react";

import { cn } from "@/libs/utils";
import TextInput from "./text-input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ref?: React.LegacyRef<HTMLInputElement>;
}
const PasswordInput = ({
  className,
  ref,
  disabled,
  ...props
}: TextInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleEye = React.useCallback(() => {
    if (disabled) return;
    setShowPassword((prev) => !prev);
  }, [disabled]);

  return (
    <section className="relative">
      <TextInput
        {...props}
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={cn("pr-10", className)}
        disabled={disabled}
      />
      <span
        className={cn(
          "absolute top-[7px] right-1 cursor-pointer select-none",
          disabled && "opacity-30"
        )}
      >
        {showPassword ? (
          <EyeIcon onClick={handleEye} />
        ) : (
          <EyeOffIcon onClick={handleEye} />
        )}
      </span>
    </section>
  );
};

export { PasswordInput };
