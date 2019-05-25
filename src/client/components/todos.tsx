import React from 'react';
import { SyncLoader } from 'react-spinners';
import { css } from 'styled-components';
import { useTodoStateContext } from '../hooks/use-todo-state-context';
import { Todo } from './todo';

export function Todos() {
  const { currentState } = useTodoStateContext();

  if (!currentState) {
    return (
      <div css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
      `}>
        <SyncLoader color="#309094"/>
      </div>
    );
  }

  return (
    <div css={css`
      margin-top: 2rem;
    `}>
      {currentState.map((todo, i) => (
        <Todo
          key={todo.name}
          todo={todo}
        />
      ))}
    </div>
  );
}
