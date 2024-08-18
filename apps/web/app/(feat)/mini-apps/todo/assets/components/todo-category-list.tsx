"use client";

import { cn } from "@/libs/utils";
import { XIcon } from "lucide-react";
import { TodoCategoryType } from "../hooks/useTodo";

function TodoCategoryList({
  selectedCategory,
  categories,
  onRemoveCategory,
  onSelectCategory,
}: {
  selectedCategory: TodoCategoryType;
  categories: TodoCategoryType[];
  onRemoveCategory: (value: TodoCategoryType) => void;
  onSelectCategory: (value: TodoCategoryType) => void;
}) {
  return (
    <div className="w-[120px] flex flex-col gap-y-[5px]">
      {categories.map((category) => (
        <div key={category.id}>
          <button
            type="button"
            onClick={() => onSelectCategory(category)}
            className={cn(
              "text-xs px-2 py-1 rounded-lg",
              "w-full flex flex-row items-center",
              "bg-[#f9f9f9] dark:bg-[#1c1c25] border-[1px]",
              selectedCategory.id === category.id
                ? "border-[#dfdfdf] dark:border-[#323242]"
                : "border-transparent"
            )}
          >
            <span
              className={cn(
                "w-[13px] h-[13px] rounded-full mr-1",
                "flex justify-center items-center",
                "group self-start mt-[1.5px]"
              )}
              style={{ backgroundColor: category.color.dark }}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveCategory(category);
              }}
            >
              <XIcon
                size={10}
                className="opacity-0 group-hover:opacity-100 text-white"
              />
            </span>
            <span className="flex-1 text-left">{category.message}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
export default TodoCategoryList;
