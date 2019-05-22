import axios from 'axios';
import { TodoEvent } from '../shared/events/todo-events';
import { TodoState } from '../shared/states/todo-state';

const baseUrl = '/.netlify/functions/server';

export const api = {
  getTodoState: (): Promise<TodoState> => axios.get(`${baseUrl}/todos`).then(r => r.data),
  uploadTodoEvents: (events: TodoEvent[]): Promise<void> => axios
    .post(`${baseUrl}/todos/events`, events)
    .then(r => r.data)
};
