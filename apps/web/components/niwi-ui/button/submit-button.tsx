"use client";

import Button from "./button";
import { useFormStatus } from "react-dom";
import { CircleDashed } from "lucide-react";

type SubmitButtonProps = {
  text?: string;
};

export default function SubmitButton({ text = "Button" }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <CircleDashed className="animate-spin" /> : text}
    </Button>
  );
}
