"use client";

import Button, { ButtonProps } from "./button";
import { useFormStatus } from "react-dom";
import { CircleDashed } from "lucide-react";

type SubmitButtonProps = {
  text?: string;
  rightIcon?: React.ReactElement;
} & ButtonProps;

export default function SubmitButton({
  text = "Button",
  rightIcon,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" {...props} disabled={pending}>
      {pending ? (
        <CircleDashed className="animate-spin" />
      ) : (
        <>
          {text}
          {rightIcon}
        </>
      )}
    </Button>
  );
}
