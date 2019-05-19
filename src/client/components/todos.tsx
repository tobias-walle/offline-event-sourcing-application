import React from 'react';
import { Todo as TodoModel } from '../../shared/models/todo';
import { Todo } from './todo';

export interface TodosProps {
  todos: TodoModel[];
  onTodosChange: (todos: TodoModel[]) => void;
}

export function Todos({ todos, onTodosChange }: TodosProps) {
  return (
    <div>
      {todos.map((todo, i) => <Todo
        key={todo.name}
        todo={todo}
        onTodoChange={newTodo => {
          const newTodos = todos.slice();
          newTodos[i] = newTodo;
          onTodosChange(newTodos);
        }}
      />)}
    </div>
  );
}
