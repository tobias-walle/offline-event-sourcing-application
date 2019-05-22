import React from 'react';
import { css } from 'styled-components';
import { TodoEventWithMetadata, useTodoStateContext } from '../hooks/use-todo-state-context';

export function DebugView() {
  const { initialState, currentState, events } = useTodoStateContext();
  return (
    <div>
      <h1>Debug</h1>
      <h2>Initial State</h2>
      <StatePreview state={initialState}/>
      <h2>Events</h2>
      {events.map((e, i) => <EventPreview key={i} event={e}/>)}
      <h2>Current State</h2>
      <StatePreview state={currentState}/>
    </div>
  );
}

interface StatePreviewProps {
  state: object;
}

function StatePreview({ state }: StatePreviewProps) {
  return (
    <pre>{JSON.stringify(state, null, 2)}</pre>
  )
}

export interface EventPreviewProps {
  event: TodoEventWithMetadata;
}

function EventPreview({ event }: EventPreviewProps) {
  return (
    <div
      css={css`
        border: 1px solid rgba(0, 0, 0, .1);
        padding: .5rem;
        margin-bottom: .5rem;
      `}
    >
      <pre>{JSON.stringify(event.event, null, 2)}</pre>
    </div>
  );
}

