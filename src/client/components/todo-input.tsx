import React, { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import { EventType } from '../../shared/events/event-type';
import { useTodoStateContext } from '../hooks/use-todo-state-context';

export function TodoInput() {
  const { emitEvent } = useTodoStateContext();
  const [name, setName] = useState('');

  const resetForm = useCallback(() => {
    setName('');
  }, [setName]);

  const handleSubmit = useCallback((event: FormEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();

    emitEvent({
      type: EventType.ADD_TODO,
      name
    });

    resetForm();
  }, [name, emitEvent]);

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Add Todo" value={name} onChange={useEventHandler(setName)}/>
      <button type="submit">Add</button>
    </form>
  );
}

function useEventHandler(setValue: (value: string) => void): ChangeEventHandler<any> {
  return useCallback((event) => {
    setValue((event.target as any).value)
  }, [setValue]);
}
