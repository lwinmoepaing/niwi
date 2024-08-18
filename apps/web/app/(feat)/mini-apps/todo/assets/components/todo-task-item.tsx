import { cn } from "@/libs/utils";
import { CheckIcon, Pencil, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TodoTaskType } from "../hooks/useTodo";
import EnterIcon from "./enter-icon";

const TodoTaskItem = ({
  task,
  onToggleTask,
  onRemoveTask,
  onChangeTaskMessage,
}: {
  task: TodoTaskType;
  onToggleTask: (value: TodoTaskType) => void;
  onRemoveTask: (value: TodoTaskType) => void;
  onChangeTaskMessage: (value: TodoTaskType) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeMessage = useCallback(() => {
    const value = inputRef.current?.value;

    if (!inputRef.current) return;

    if (!value || !value?.trim())
      return toast.error("Please make sure not empty");

    onChangeTaskMessage({ ...task, message: value });
    setIsEdit(false);
  }, []);

  if (isEdit) {
    return (
      <div
        className={cn(
          "text-xs px-2 py-2 rounded-lg",
          "w-full flex flex-row items-center",
          "bg-[#f9f9f9] dark:bg-[#1c1c25] my-1",
          "group cursor-pointer"
        )}
      >
        <div className="w-full py-[8px] px-[10px] bg-white rounded-md dark:bg-[#111119] flex flex-col">
          <input
            placeholder="Type and press enter to save or esc to cancel"
            className="w-full h-full bg-transparent outline-none ring-0"
            ref={inputRef}
            defaultValue={task.message}
            onKeyUp={(e) => {
              console.log(e.key);
              if (e.key === "Enter") return onChangeMessage();
              if (e.key === "Escape") return setIsEdit(false);
            }}
          />
          <div className="mt-2 text-xs flex flex-row gap-x-[5px]">
            <button
              onClick={() => onChangeMessage()}
              type="button"
              className="rounded-md hover:bg-[#eeeeee] hover:dark:bg-[#1c1c25] items-center flex flex-row py-[4px] pr-[5px]"
            >
              <span className="bg-[#eeeeee] dark:bg-[#1c1c25] pl-[5px] pr-[2px] py-[2px] rounded-md mr-1">
                <EnterIcon />
              </span>{" "}
              Save
            </button>
            <button
              onClick={() => setIsEdit(false)}
              type="button"
              className="rounded-md hover:bg-[#eeeeee] hover:dark:bg-[#1c1c25] flex flex-row items-center py-[4px] pr-[5px]"
            >
              <span className="bg-[#eeeeee] dark:bg-[#1c1c25] px-[5px] py-[2px] rounded-md mr-1">
                ESC
              </span>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "text-xs px-2 py-2 rounded-lg",
        "w-full flex flex-row items-center",
        "bg-[#f9f9f9] dark:bg-[#1c1c25] my-1",
        "group cursor-pointer"
      )}
    >
      <span
        className={cn(
          "w-[13px] h-[13px] rounded-[4px] mr-2",
          "flex justify-center items-center",
          "group self-start mt-[1.5px]",
          "border cursor-pointer dark:border-[#898989] border-[#dfdfdf]",
          task.complete && "bg-[#dfdfdf] border-transparent"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggleTask(task);
        }}
      >
        <CheckIcon
          size={10}
          className={cn(
            "opacity-0 group-hover:opacity-100 dark:text-[#898989] text-black",
            task.complete && "opacity-100"
          )}
        />
      </span>
      <p className="flex-1 text-left">{task.message}</p>
      <div
        className={cn(
          "w-[50px] h-full mx-1 gap-x-[10px]",
          " hidden group-hover:flex flex-row"
        )}
      >
        <Pencil
          size={14}
          className="opacity-50 hover:opacity-90"
          onClick={() => setIsEdit(true)}
        />
        <Trash2
          size={14}
          className="opacity-50 hover:opacity-90"
          onClick={() => onRemoveTask(task)}
        />
      </div>
      <div
        className="mx-1 text-white px-[10px] rounded-md text-[10px] group-hover:hidden"
        style={{ backgroundColor: task.category.color.dark }}
      >
        {task.category.message}
      </div>
    </div>
  );
};
export default TodoTaskItem;
