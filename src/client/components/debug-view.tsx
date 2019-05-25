import React from 'react';
import ReactJson from 'react-json-view'
import { SyncLoader } from 'react-spinners';
import styled, { css } from 'styled-components';
import { TodoEventWithMetadata, useTodoStateContext } from '../hooks/use-todo-state-context';

export function DebugView() {
  const { initialState, currentState, events, syncEventsWithApi, resetServerState, resetLocalEvents } = useTodoStateContext();
  return (
    <Wrapper>
      <h1>Debug</h1>
      <h2>Initial State</h2>
      <StatePreview state={initialState}/>
      <h2>Events</h2>
      <StyledButton
        onClick={syncEventsWithApi}
        disabled={events.length === 0}
      >Sync
      </StyledButton>
      <StyledButton onClick={resetServerState}>Reset Server State</StyledButton>
      <StyledButton onClick={resetLocalEvents}>Reset Local Events</StyledButton>
      {events.map((e, i) => <EventPreview key={i} event={e}/>)}
      <h2>Current Local State</h2>
      <StatePreview state={currentState}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    h2 {
      font-size: 1.1rem;
      margin-bottom: .1rem;
    }
`;

const StyledButton = styled.button`
    padding: .3rem .5rem;
    margin: 0 .3rem;
    cursor: pointer;
    background: white;
    font-size: .8rem;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 3px;

    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:not(:disabled) {
      &:hover, &:focus {
        background: rgba(0, 0, 0, .05);
      }
    }
`;

interface StatePreviewProps {
  state?: object;
}

function StatePreview({ state }: StatePreviewProps) {
  const { isLoadingState } = useTodoStateContext();
  if (!state || isLoadingState) {
    return (
      <div css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
        <SyncLoader color="grey" size={8}/>
      </div>
    );
  }
  return (
    <ReactJson
      name={null}
      src={state}
      collapsed={false}
      displayDataTypes={false}
      displayObjectSize={false}
    />
  )
}

export interface EventPreviewProps {
  event: TodoEventWithMetadata;
}

function EventPreview({ event }: EventPreviewProps) {
  const { isUploadingEvents } = useTodoStateContext();
  return (
    <div
      css={css`
        border: 1px solid rgba(0, 0, 0, .1);
        margin-top: 1rem;
      `}
    >
      <IsSyncedDisplay isSyncing={isUploadingEvents} isSynced={event.isSynced}/>
      <div
        css={css`
          padding: .5rem;
        `}
      >
        {
          Object.entries(event.event)
            .map(([key, value]) => <EventPreviewEntry key={key} name={key} value={value}/>)
        }
      </div>
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
      background: rgba(0, 0, 0, .03);
      padding: .1rem;
      font-size: .8rem;
    `}>{
      isSynced
        ? 'Synced'
        : isSyncing
        ? 'Synchronize...'
        : 'Not Synced'
    }</div>
  );
}

export interface EventPreviewEntryProps {
  name: string;
  value: any;
}

function EventPreviewEntry({ name, value }: EventPreviewEntryProps) {
  console.log(name, value);
  return (
    <div css={css`
      display: flex;
    `}>
      <div
        css={css`
          font-weight: bold;
          margin-right: .5rem;
        `}
      >{name}:
      </div>
      <div
        css={css`
          color: #00A0BE
        `}
      >{value}</div>
    </div>
  );
}

