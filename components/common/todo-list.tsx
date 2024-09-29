"use client";

import { useState } from "react";

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
    <ul>
      {todos.map((item, index) => (
        <li key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleCheck(index)}
            className="mr-2 size-8"
          />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
