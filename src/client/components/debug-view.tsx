import React from 'react';
import { css } from 'styled-components';
import { TodoEventWithMetadata, useTodoStateContext } from '../hooks/use-todo-state-context';

export function DebugView() {
  const { initialState, currentState, serverState, events, syncEventsWithApi } = useTodoStateContext();
  return (
    <div>
      <h1>Debug</h1>
      <h2>Initial State</h2>
      <StatePreview state={initialState}/>
      <h2>Events</h2>
      <button
        onClick={syncEventsWithApi}
        disabled={events.length === 0}
      >Sync</button>
      {events.map((e, i) => <EventPreview key={i} event={e}/>)}
      <h2>Current Local State</h2>
      <StatePreview state={currentState}/>
      <h2>Current Server State</h2>
      <StatePreview state={serverState}/>
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
      <IsSyncedDisplay isSynced={event.isSynced}/>
      <pre>{JSON.stringify(event.event, null, 2)}</pre>
    </div>
  );
}

interface IsSyncedDisplayProps {
  isSynced: boolean;
}

function IsSyncedDisplay({ isSynced }: IsSyncedDisplayProps) {
  return (
    <div css={css`
      text-align: center;
      color: ${isSynced ? 'green' : 'grey'};
      padding: .3rem;
      border-radius: 4px;
    `}>{
      isSynced ? 'Synced' : 'Not Synced'
    }</div>
  );
}

