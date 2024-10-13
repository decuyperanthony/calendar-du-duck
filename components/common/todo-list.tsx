"use client";

import { useState } from "react";

import { CustomCheckbox } from "./custom-checkbox";

import { SimpleCard } from "./simple-card";

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
    <SimpleCard>
      <ul className="space-y-4">
        {todos.map(({ label, checked }, index) => (
          <li key={index}>
            <CustomCheckbox
              id={`todo__${label}__${index}`}
              checked={checked}
              onCheckedChange={() => toggleCheck(index)}
              label={label}
            />
          </li>
        ))}
      </ul>
    </SimpleCard>
  );
};

export default TodoList;
