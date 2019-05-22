import React from 'react';
import { useTodoStateContext } from '../hooks/use-todo-state-context';
import { Todo } from './todo';

export function Todos() {
  const { currentState } = useTodoStateContext();

  return (
    <div>
      {currentState.map((todo, i) => (
        <Todo
          key={todo.name}
          todo={todo}
        />
      ))}
    </div>
  );
}
