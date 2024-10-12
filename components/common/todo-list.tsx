"use client";

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

type TodoItem = {
  label: string;
  checked: boolean;
};

type TodoListProps = {
  items: TodoItem[];
};

const TodoList = ({ items }: TodoListProps) => {
  const [todos, setTodos] = useState(items);

  const toggleCheck = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  return (
    <ul className="space-y-4">
      {todos.map((item, index) => (
        <li key={index} className="flex items-center gap-4">
          <Checkbox
            id={`todo-${index}`}
            checked={item.checked}
            onCheckedChange={() => toggleCheck(index)}
            className="size-5"
          />
          <label
            htmlFor={`todo-${index}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
