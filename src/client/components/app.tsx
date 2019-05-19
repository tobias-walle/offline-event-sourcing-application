import React, { useState } from 'react';
import styled from 'styled-components';
import { Todo as TodoModel } from '../../shared/models/todo';
import { TodoInput } from './todo-input';
import { Todos } from './todos';

export function App() {
  const [todos, setTodos] = useState<TodoModel[]>([
    { name: 'Cleanup', isDone: false },
    { name: 'Buy Groceries', isDone: false },
  ]);
  return <div>
    <AppHeader>My Todo App</AppHeader>
    <TodoInput onAddTodo={newTodo => setTodos([...todos, newTodo])}/>
    <Todos todos={todos} onTodosChange={setTodos}/>
  </div>;
}

const AppHeader = styled.h1`
`;
