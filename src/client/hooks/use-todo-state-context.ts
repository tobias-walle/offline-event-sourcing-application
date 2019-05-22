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
  initialState: TodoState;
  currentState: TodoState;
  serverState: TodoState;
  events: TodoEventWithMetadata[];
  emitEvent: (event: TodoEvent) => void;
  syncEventsWithApi: () => Promise<void>;
}

function useTodoState(): UseTodoStateValue {
  const [initialState, setInitialState] = useState<TodoState>([]);
  const [serverState, setServerState] = useState<TodoState>([]);
  const [events, setEvents] = useState<TodoEventWithMetadata[]>([]);

  // Load initial state from api
  useEffect(() => {
    api.getTodoState().then(state => {
      setInitialState(state);
      setServerState(state);
    });
  }, []);

  const currentState = useMemo(() => (
    events.map(e => e.event).reduce(todoReducer, initialState)
  ), [events, initialState]);

  const emitEvent = useCallback((event: TodoEvent) => {
    setEvents([...events, { event, isSynced: false }]);
  }, [setEvents, events]);


  const syncEventsWithApi = useCallback(async () => {
    await api.uploadTodoEvents(events.map(e => e.event));
    const serverState = await api.getTodoState();
    setEvents(events.map(e => ({ ...e, isSynced: true })));
    setServerState(serverState);
  }, [setInitialState, events, setEvents]);

  return {
    initialState,
    currentState,
    serverState,
    events,
    emitEvent,
    syncEventsWithApi
  }
}

export const useTodoStateContext = createUseContext(useTodoState);
