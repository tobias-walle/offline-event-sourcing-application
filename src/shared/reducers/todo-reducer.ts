import { EventType } from '../events/event-type';
import { TodoEvent } from '../events/todo-events';
import { Todo } from '../models/todo';
import { TodoState } from '../states/todo-state';

export function todoReducer(state: TodoState, event: TodoEvent): TodoState {
  switch (event.type) {
    case EventType.ADD_TODO: {
      const todoDoesNotExist = findTodo(state, event.name) == null;
      if (todoDoesNotExist) {
        const newTodo: Todo = {
          name: event.name,
          isDone: false
        };
        state.push(newTodo);
      }
      return state;
    }
    case EventType.FINISH_TODO: {
      const todo = findTodo(state, event.name);
      if (todo) {
        todo.isDone = true;
      }
      return state;
    }
    case EventType.UNFINISH_TODO: {
      const todo = findTodo(state, event.name);
      if (todo) {
        todo.isDone = false;
      }
      return state;
    }
  }
  return state;
}

function findTodo(state: TodoState, name: string): Todo | undefined {
  return state.find(todo => todo.name === name);
}
