"use client";

import useTodo from "../hooks/useTodo";
import TodoCategoryInput from "./todo-category-input";
import TodoCategoryList from "./todo-category-list";
import TodoTaskList from "./todo-task-list";

function TodoList() {
  const {
    onAddCategory,
    onRemoveCategory,
    onSelectCategory,
    onAddTaskList,
    onToggleTask,
    onChangeTaskMessage,
    onRemoveTask,
    filterTodoList,
    selectedCategory,
    categories,
  } = useTodo();

  return (
    <>
      <TodoCategoryInput onAddCategory={onAddCategory} />
      <div className="my-5 px-1 flex flex-row">
        <TodoCategoryList
          selectedCategory={selectedCategory}
          categories={categories}
          onRemoveCategory={onRemoveCategory}
          onSelectCategory={onSelectCategory}
        />
        <TodoTaskList
          todoTasks={filterTodoList}
          selectedCategory={selectedCategory}
          onAddTaskList={onAddTaskList}
          onToggleTask={onToggleTask}
          onRemoveTask={onRemoveTask}
          onChangeTaskMessage={onChangeTaskMessage}
        />
      </div>
    </>
  );
}
export default TodoList;
