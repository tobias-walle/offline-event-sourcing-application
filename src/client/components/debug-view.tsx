import React from 'react';
import { css } from 'styled-components';
import { TodoEventWithMetadata, useTodoStateContext } from '../hooks/use-todo-state-context';

export function DebugView() {
  const { isSyncing, initialState, currentState, events, syncEventsWithApi, resetEvents } = useTodoStateContext();
  return (
    <div>
      <h1>Debug</h1>
      <h2>Initial State</h2>
      <StatePreview isLoading={isSyncing} state={initialState}/>
      <h2>Events</h2>
      <button
        onClick={syncEventsWithApi}
        disabled={events.length === 0}
      >Sync
      </button>
      <button onClick={resetEvents}>Reset Server State</button>
      {events.map((e, i) => <EventPreview key={i} event={e}/>)}
      <h2>Current Local State</h2>
      <StatePreview state={currentState}/>
    </div>
  );
}

interface StatePreviewProps {
  isLoading?: boolean;
  state?: object;
}

function StatePreview({ state, isLoading }: StatePreviewProps) {
  if (!state) {
    return null;
  }
  return (
    <pre style={{
      color: isLoading ? 'grey' : 'inherit'
    }}>{JSON.stringify(state, null, 2)}</pre>
  )
}

export interface EventPreviewProps {
  event: TodoEventWithMetadata;
}

function EventPreview({ event }: EventPreviewProps) {
  const { isSyncing } = useTodoStateContext();
  return (
    <div
      css={css`
        border: 1px solid rgba(0, 0, 0, .1);
        padding: .5rem;
        margin-bottom: .5rem;
      `}
    >
      <IsSyncedDisplay isSyncing={isSyncing} isSynced={event.isSynced}/>
      <pre>{JSON.stringify(event.event, null, 2)}</pre>
    </div>
  );
}

interface IsSyncedDisplayProps {
  isSyncing: boolean;
  isSynced: boolean;
}

function IsSyncedDisplay({ isSyncing, isSynced }: IsSyncedDisplayProps) {
  return (
    <div css={css`
      text-align: center;
      color: ${isSynced ? 'green' : 'grey'};
      padding: .3rem;
      border-radius: 4px;
    `}>{
      isSynced
        ? 'Synced'
        : isSyncing
        ? 'Synchronize...'
        : 'Not Synced'
    }</div>
  );
}

