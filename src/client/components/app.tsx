import React from 'react';
import styled from 'styled-components';
import { useTodoStateContext } from '../hooks/use-todo-state-context';
import { TodoInput } from './todo-input';
import { Todos } from './todos';

export function App() {
  return <div>
    <AppHeader>My Todo App</AppHeader>
    <useTodoStateContext.Provider>
      <TodoInput/>
      <Todos/>
    </useTodoStateContext.Provider>
  </div>;
}

const AppHeader = styled.h1`
`;
