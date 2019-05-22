import React, { useCallback } from 'react';
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
    <div>
      <label>
        <input type="checkbox" checked={todo.isDone} onChange={toggleTodoFinished}/>
        {todo.name}
      </label>
    </div>
  );
}
