import React, { ChangeEventHandler, FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
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
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput placeholder="Add Todo" value={name} onChange={useEventHandler(setName)}/>
      <StyledButton disabled={!name} type="submit">+</StyledButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
    display: flex;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.13);
`;

const StyledInput = styled.input`
    display: block;
    border: 1px solid rgba(0, 0, 0, .1);
    font-size: inherit;
    width: 20rem;
    background: white;
    padding: .5rem;
    border-right: 1px solid rgba(0, 0, 0, .08);

    &:focus, &:hover {
      outline: none;
      background: rgba(255, 255, 255, .8);
    }

    &::placeholder {
      color: rgba(0, 0, 0, .3);
    }
`;

const StyledButton = styled.button`
    cursor: pointer;
    display: block;
    border: 1px solid rgba(0, 0, 0, .1);
    width: calc(1ch + 2rem);
    height: calc(1ch + 2rem);
    text-align: center;
    font-size: 1.4rem;
    background: white;
    margin: 0;

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:not(:disabled) {
      &:focus, &:hover {
        background: rgba(255, 255, 255, .8);
      }
    }
`;

function useEventHandler(setValue: (value: string) => void): ChangeEventHandler<any> {
  return useCallback((event) => {
    setValue((event.target as any).value)
  }, [setValue]);
}
