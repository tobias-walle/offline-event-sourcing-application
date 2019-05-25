import React, { useCallback } from 'react';
import styled from 'styled-components';
import { EventType } from '../../shared/events/event-type';
import { TodoEvent } from '../../shared/events/todo-events';
import { Todo as TodoModel } from '../../shared/models/todo';
import { useTodoStateContext } from '../hooks/use-todo-state-context';

export interface TodoProps {
  todo: TodoModel;
}

export function Todo({ todo }: TodoProps) {
  const { emitEvent } = useTodoStateContext();

  const toggleTodoFinished = useCallback(() => {
    const event: TodoEvent = todo.isDone
      ? {
        type: EventType.UNFINISH_TODO,
        name: todo.name
      }
      : {
        type: EventType.FINISH_TODO,
        name: todo.name
      };

    emitEvent(event)
  }, [todo, emitEvent]);

  return (
    <Wrapper>
      <CheckboxWrapper>
        <input type="checkbox" checked={todo.isDone} onChange={toggleTodoFinished}/>
      </CheckboxWrapper>
      {todo.name}
    </Wrapper>
  );
}

const CheckboxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
`;

const Wrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 21rem;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.08);

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
`;
