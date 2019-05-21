import { EventType } from './event-type';

export interface AbstractEvent<T extends EventType> {
  type: T;
}
