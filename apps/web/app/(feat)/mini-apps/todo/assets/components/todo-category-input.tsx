"use client";

import { cn } from "@/libs/utils";
import useAppStore from "@/stores/app/app.store";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { colorList, ColorType, TodoCategoryType } from "../hooks/useTodo";
import EnterIcon from "./enter-icon";

const defaultColorList = colorList[0] as ColorType;

const ColorItem = ({
  color,
  selectedColor,
  onClick,
}: {
  color: ColorType;
  selectedColor: ColorType;
  onClick: (color: ColorType) => void;
}) => {
  const theme = useAppStore((store) => store.theme);
  const isActive = useMemo(
    () => selectedColor.id === color.id,
    [color, selectedColor]
  );

  return (
    <div
      className={cn(
        "w-[40px] h-[34px]",
        "hover:bg-black/5 dark:hover:bg-white/10",
        "flex justify-center items-center cursor-pointer rounded-[5px]"
      )}
      onClick={() => onClick(color)}
    >
      <div
        className={cn(
          "rounded-full w-[13px] h-[13px]",
          "transition ease-in-out duration-200",
          isActive && "scale-150"
        )}
        style={{ backgroundColor: theme === "dark" ? color.dark : color.light }}
      ></div>
    </div>
  );
};

type TotoCategoryInputProps = {
  onAddCategory: (value: TodoCategoryType) => void;
};

const TodoCategoryInput = ({ onAddCategory }: TotoCategoryInputProps) => {
  const [selectedColor, setSelectedColor] =
    useState<ColorType>(defaultColorList);

  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateCategory = useCallback(() => {
    const value = inputRef.current?.value;

    if (!inputRef.current) return;

    if (!value || !value?.trim())
      return toast.error("Please Enter Category Name");

    inputRef.current.value = "";

    onAddCategory({
      id: nanoid(),
      message: value,
      color: selectedColor,
    });
  }, [selectedColor, onAddCategory]);

  return (
    <>
      <div className="w-full flex gap-x-[1px] pl-[10px] pr-[12px] items-center min-h-[56px] bg-[#f9f9f9] dark:bg-[#1c1c25] rounded-xl">
        {colorList.map((color) => (
          <ColorItem
            key={color.id}
            color={color}
            onClick={setSelectedColor}
            selectedColor={selectedColor}
          />
        ))}
        <div className="h-[32px] border-r dark:border-[#39393e] mx-[10px]" />
        <div className="h-[40px] w-full px-[10px] bg-white rounded-xl dark:bg-[#111119] flex flex-row items-center">
          <input
            placeholder="Create new category"
            className="w-full h-full bg-transparent outline-none ring-0"
            ref={inputRef}
            onKeyUp={(e) => {
              if (e.key === "Enter") onCreateCategory();
            }}
          />
          <button
            onClick={onCreateCategory}
            className="rounded-md hover:bg-[#f9f9f9] hover:dark:bg-[#1c1c25] text-xs flex flex-row px-[10px] py-[4px]"
          >
            <EnterIcon /> Save
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoCategoryInput;
