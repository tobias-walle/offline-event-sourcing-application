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
  isLoadingState: boolean;
  isUploadingEvents: boolean;
}

function useTodoState(): UseTodoStateValue {
  const [initialState, setInitialState] = useState<TodoState>();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isUploadingEvents, setIsUploadingEvents] = useState(false);
  const [events, setEvents] = useState<TodoEventWithMetadata[]>([]);

  const currentState = useMemo(() => (
    initialState && events.map(e => e.event).reduce(todoReducer, initialState)
  ), [events, initialState]);

  const emitEvent = useCallback((event: TodoEvent) => {
    setEvents([...events, { event, isSynced: false }]);
  }, [setEvents, events]);

  const syncEventsWithApi = useCallback(async () => {
    setIsUploadingEvents(true);
    await api.uploadTodoEvents(events.map(e => e.event));
    setEvents(events.map(e => ({ ...e, isSynced: true })));
    setIsUploadingEvents(false);

    setIsLoadingState(true);
    const state = await api.getTodoState();
    setEvents([]);
    setInitialState(state);
    setIsLoadingState(false);
  }, [setInitialState, events, setEvents, api, setIsUploadingEvents, setIsLoadingState]);

  const resetEvents = useCallback(async () => {
    setIsLoadingState(true);
    await api.resetTodoEvents();
    const state = await api.getTodoState();
    setInitialState(state);
    setIsLoadingState(false);
  }, [api, setInitialState, setIsLoadingState]);

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
    isLoadingState,
    isUploadingEvents
  }
}

export const useTodoStateContext = createUseContext(useTodoState);
