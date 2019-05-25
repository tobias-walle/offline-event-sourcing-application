import createUseContext from 'constate';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TodoEvent } from '../../shared/events/todo-events';
import { todoReducer } from '../../shared/reducers/todo-reducer';
import { TodoState } from '../../shared/states/todo-state';
import { api } from '../api';

export interface TodoEventWithMetadata {
  event: TodoEvent;
  isSynced: boolean;
}

export interface UseTodoStateValue {
  initialState?: TodoState;
  currentState?: TodoState;
  events: TodoEventWithMetadata[];
  emitEvent: (event: TodoEvent) => void;
  resetEvents: () => void;
  syncEventsWithApi: () => Promise<void>;
  isSyncing: boolean;
}

function useTodoState(): UseTodoStateValue {
  const [initialState, setInitialState] = useState<TodoState>();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<TodoEventWithMetadata[]>([]);

  const currentState = useMemo(() => (
    initialState && events.map(e => e.event).reduce(todoReducer, initialState)
  ), [events, initialState]);

  const emitEvent = useCallback((event: TodoEvent) => {
    setEvents([...events, { event, isSynced: false }]);
  }, [setEvents, events]);

  const syncEventsWithApi = useCallback(async () => {
    setIsLoading(true);
    await api.uploadTodoEvents(events.map(e => e.event));
    const state = await api.getTodoState();
    setEvents([]);
    setInitialState(state);
    setIsLoading(false);
  }, [setInitialState, events, setEvents, api]);

  const resetEvents = useCallback(async () => {
    await api.resetTodoEvents();
  }, [api]);

  // Load initial state from api
  useEffect(() => {
    syncEventsWithApi().catch(console.error);
  }, []);

  return {
    initialState,
    currentState,
    events,
    emitEvent,
    resetEvents,
    syncEventsWithApi,
    isSyncing: isLoading
  }
}

export const useTodoStateContext = createUseContext(useTodoState);
