import { AbstractEvent } from './abstract-event';
import { EventType } from './event-type';

export interface AddTodoEvent extends AbstractEvent<EventType.ADD_TODO> {
  name: string;
}

export interface FinishTodoEvent extends AbstractEvent<EventType.FINISH_TODO> {
  name: string;
}

export interface UnfinishTodoEvent extends AbstractEvent<EventType.UNFINISH_TODO> {
  name: string;
}

export type TodoEvent = AddTodoEvent | FinishTodoEvent | UnfinishTodoEvent;
