import { useEffect, useState } from "react";

export function useEditorPointInteractions() {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [isDoubleClick, setIsDoubleClick] = useState(false);

  useEffect(() => {
    const handlePointerUp = () => {
      setIsPointerDown(false);
      setIsDoubleClick(false);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    const handlePointerDown = () => {
      setIsPointerDown(true);
      document.addEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyUp = () => {
      setIsKeyDown(false);
      setIsDoubleClick(false);
      document.removeEventListener("keyup", handleKeyUp);
    };

    const handleKeyDown = () => {
      setIsKeyDown(true);
      document.addEventListener("keyup", handleKeyUp);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const doubleClick = () => {
      setIsDoubleClick(true);
      setTimeout(() => setIsDoubleClick(false), 10);
    };

    document.addEventListener("dblclick", doubleClick);
    return () => {
      document.removeEventListener("dblclick", doubleClick);
    };
  }, []);

  return { isPointerDown, isKeyDown, isDoubleClick };
}
