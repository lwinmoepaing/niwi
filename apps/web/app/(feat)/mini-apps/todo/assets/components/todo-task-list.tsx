import { useCallback, useMemo, useRef } from "react";
import EnterIcon from "./enter-icon";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import TodoTaskItem from "./todo-task-item";
import { TodoCategoryType, TodoTaskType } from "../hooks/useTodo";

type TodoTaskListProps = {
  todoTasks: TodoTaskType[];
  selectedCategory: TodoCategoryType;
  onAddTaskList: (value: TodoTaskType) => void;
  onToggleTask: (value: TodoTaskType) => void;
  onRemoveTask: (value: TodoTaskType) => void;
  onChangeTaskMessage: (value: TodoTaskType) => void;
};

function TodoTaskList({
  todoTasks,
  selectedCategory,
  onAddTaskList,
  onToggleTask,
  onRemoveTask,
  onChangeTaskMessage,
}: TodoTaskListProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateTask = useCallback(() => {
    const value = inputRef.current?.value;

    if (!inputRef.current) return;

    if (!value || !value?.trim()) return toast.error("Please Enter Task Name");

    inputRef.current.value = "";

    onAddTaskList({
      id: nanoid(),
      message: value,
      category: selectedCategory,
      complete: false,
    });
  }, [selectedCategory]);

  const undoneList = useMemo(() => {
    return todoTasks.filter((task) => !task.complete);
  }, [todoTasks]);

  const doneList = useMemo(() => {
    return todoTasks.filter((task) => task.complete);
  }, [todoTasks]);

  return (
    <div className="flex flex-col flex-1 px-[10px] text-sm">
      <div className="flex flex-row items-center mb-2">
        <h1 className="w-[68px]">Task List</h1>
        <div className="h-[30px] flex-1 px-[10px] bg-white rounded-lg dark:bg-[#111119] border dark:border-[#303039] flex flex-row items-center">
          <input
            placeholder={`Create New Task ${selectedCategory.id !== "default" ? " For " + selectedCategory.message : ""}`}
            className="w-full h-full bg-transparent outline-none ring-0"
            ref={inputRef}
            onKeyUp={(e) => {
              if (e.key === "Enter") onCreateTask();
            }}
          />
          <button
            // onClick={onCreateCategory}
            className="rounded-md hover:bg-[#f9f9f9] hover:dark:bg-[#1c1c25] text-xs flex flex-row px-[10px] py-[2px]"
          >
            <EnterIcon /> Save
          </button>
        </div>
      </div>
      {undoneList.map((task) => (
        <TodoTaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onRemoveTask={onRemoveTask}
          onChangeTaskMessage={onChangeTaskMessage}
        />
      ))}
      {doneList.length > 0 && <h1 className="my-2">Completed Task List</h1>}
      {doneList.map((task) => (
        <TodoTaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onRemoveTask={onRemoveTask}
          onChangeTaskMessage={onChangeTaskMessage}
        />
      ))}
    </div>
  );
}
export default TodoTaskList;
