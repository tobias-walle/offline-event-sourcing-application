import React, { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import { Todo as TodoModel } from '../../shared/models/todo';

export interface TodoInputProps {
  onAddTodo: (todo: TodoModel) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [name, setName] = useState('');

  const resetForm = useCallback(() => {
    setName('');
  }, [setName]);

  const handleSubmit = useCallback((event: FormEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();

    const newTodo: TodoModel = {
      name,
      isDone: false
    };
    onAddTodo(newTodo);

    resetForm();
  }, [name, onAddTodo]);

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
