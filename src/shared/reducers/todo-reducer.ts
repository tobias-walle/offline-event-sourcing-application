import { EventType } from '../events/event-type';
import { TodoEvent } from '../events/todo-events';
import { Todo } from '../models/todo';
import { TodoState } from '../states/todo-state';

export function todoReducer(state: TodoState, event: TodoEvent): TodoState {
  const reducer = reducers[event.type];
  return reducer(state, event);
}

const reducers: Record<TodoEvent['type'], (state: TodoState, event: TodoEvent) => TodoState> = {
  [EventType.ADD_TODO]: (state, event) => {
    const todoDoesNotExist = findTodoIndex(state, event.name) < 0;
    if (todoDoesNotExist) {
      const newTodo: Todo = {
        name: event.name,
        isDone: false
      };

      // Shallow copy state
      state = state.slice();

      state.push(newTodo);
    }
    return state;
  },
  [EventType.FINISH_TODO]: (state, event) => {
    const index = findTodoIndex(state, event.name);
    if (index >= 0) {
      state = state.slice();
      state[index] = {
        ...state[index],
        isDone: true
      };
    }
    return state;
  },
  [EventType.UNFINISH_TODO]: (state, event) => {
    const index = findTodoIndex(state, event.name);
    if (index >= 0) {
      state = state.slice();
      state[index] = {
        ...state[index],
        isDone: false
      };
    }
    return state;
  },
};

function findTodoIndex(state: TodoState, name: string): number {
  return state.findIndex(todo => todo.name === name);
}
