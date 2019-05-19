import React, { ChangeEvent, useCallback } from 'react';
import { Todo as TodoModel } from '../../shared/models/todo';

export interface TodoProps {
  todo: TodoModel;
  onTodoChange: (todo: TodoModel) => void;
}

export function Todo({ todo, onTodoChange }: TodoProps) {
  const handleCheckedEvent = useCallback((event: ChangeEvent<any>) => {
    onTodoChange({ ...todo, isDone: event.target.checked });
  }, [todo, onTodoChange]);

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.isDone} onChange={handleCheckedEvent}/>
        {todo.name}
      </label>
    </div>
  );
}
