import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

export type ColorType = {
  id: string;
  light: string;
  dark: string;
};

export type TodoCategoryType = {
  id: string;
  message: string;
  color: ColorType;
};

export const colorList: ColorType[] = [
  {
    id: "red",
    light: "#e63b6d",
    dark: "#e63b6d",
  },
  {
    id: "purple",
    light: "#7e23ce",
    dark: "#7e23ce",
  },
  {
    id: "blue",
    light: "#649df8",
    dark: "#649df8",
  },
] as const;

export type TodoTaskType = {
  id: string;
  message: string;
  category: TodoCategoryType;
  complete: boolean;
};

const useTodo = () => {
  const [categories, setCategories] = useState<TodoCategoryType[]>([
    {
      id: "default",
      color: {
        id: "default",
        light: "#dfdfdf",
        dark: "#111119",
      },
      message: "All-Categories",
    },
    {
      id: "product",
      color: colorList[2] as ColorType,
      message: "Product",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<TodoCategoryType>(
    categories[0] as TodoCategoryType
  );

  const [todoList, setTodoList] = useState<TodoTaskType[]>([
    {
      id: "1",
      message: "Todo List",
      category: categories[0] as TodoCategoryType,
      complete: false,
    },
  ]);

  const onAddCategory = useCallback(
    (value: TodoCategoryType) => {
      const someSameMessage = categories.some(
        (cat) => cat.message === value.message
      );
      if (someSameMessage)
        return toast.error("This category has already been added");
      setCategories((prev) => [...prev, value]);
    },
    [categories]
  );

  const onRemoveCategory = useCallback((value: TodoCategoryType) => {
    if (value.id === "default")
      return toast.error("Non-Category can't be removed.");

    setCategories((prev) => prev.filter((cat) => cat.id !== value.id));

    setTodoList((prev) => prev.filter((todo) => todo.category.id !== value.id));
  }, []);

  const onSelectCategory = useCallback((value: TodoCategoryType) => {
    setSelectedCategory(value);
  }, []);

  // Add List
  const onAddTaskList = useCallback(
    (value: TodoTaskType) => setTodoList((prev) => [...prev, value]),
    []
  );

  const onToggleTask = useCallback((value: TodoTaskType) => {
    setTodoList((prev) => {
      return prev.reduce((prevTodo, nextTodo) => {
        const newTodo = { ...nextTodo };
        if (nextTodo.id === value.id) {
          newTodo.complete = !newTodo.complete;
        }
        return [...prevTodo, newTodo];
      }, [] as TodoTaskType[]);
    });
  }, []);

  const onChangeTaskMessage = useCallback((value: TodoTaskType) => {
    setTodoList((prev) => {
      return prev.reduce((prevTodo, nextTodo) => {
        const newTodo = { ...nextTodo };
        if (nextTodo.id === value.id) {
          newTodo.message = value.message;
        }
        return [...prevTodo, newTodo];
      }, [] as TodoTaskType[]);
    });
  }, []);

  const onRemoveTask = useCallback((value: TodoTaskType) => {
    setTodoList((prev) => {
      return prev.filter((todo) => todo.id !== value.id);
    });
  }, []);

  const filterTodoList = useMemo(() => {
    if (selectedCategory.id === "default") return todoList;

    return todoList.filter((todo) => todo.category.id === selectedCategory.id);
  }, [todoList, selectedCategory]);

  return {
    selectedCategory,
    categories,
    onAddCategory,
    onRemoveCategory,
    onSelectCategory,
    onAddTaskList,
    onToggleTask,
    onChangeTaskMessage,
    onRemoveTask,
    filterTodoList,
  };
};
export default useTodo;
