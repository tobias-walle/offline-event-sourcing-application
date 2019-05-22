import createUseContext from 'constate';
import { useCallback, useMemo, useState } from 'react';
import { TodoEvent } from '../../shared/events/todo-events';
import { todoReducer } from '../../shared/reducers/todo-reducer';
import { TodoState } from '../../shared/states/todo-state';

export interface TodoEventWithMetadata {
  event: TodoEvent;
  isSynced: boolean;
}

export interface UseTodoStateValue {
  initialState: TodoState;
  currentState: TodoState;
  events: TodoEventWithMetadata[];
  emitEvent: (event: TodoEvent) => void;
}

function useTodoState(): UseTodoStateValue {
  const [initialState, setInitialState] = useState<TodoState>([]);
  const [events, setEvents] = useState<TodoEventWithMetadata[]>([]);

  const currentState = useMemo(() => (
    events.map(e => e.event).reduce(todoReducer, initialState)
  ), [events, initialState]);

  const emitEvent = useCallback((event: TodoEvent) => {
    setEvents([...events, { event, isSynced: false }]);
  }, [setEvents, events]);

  return {
    initialState,
    currentState,
    events,
    emitEvent
  }
}

export const useTodoStateContext = createUseContext(useTodoState);
