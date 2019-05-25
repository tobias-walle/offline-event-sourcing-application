import { TodoEvent } from '../../shared/events/todo-events';
import { todoReducer } from '../../shared/reducers/todo-reducer';
import { TodoState } from '../../shared/states/todo-state';
import { getFromJsonBin, saveToJsonBin } from '../utils/json-bin';

export class TodoRepository {
  public async addEvents(events: TodoEvent[]): Promise<void> {
    const db = await getFromJsonBin();
    db.todoEvents.push(...events);
    console.log('SAVE', db);
    await saveToJsonBin(db);
  }

  public async deleteAllEvents(): Promise<void> {
    const db = await getFromJsonBin();
    await saveToJsonBin({
      ...db,
      todoEvents: []
    });
  }

  public async getTodoState(): Promise<TodoState> {
    const db = await getFromJsonBin();
    return db.todoEvents.reduce(todoReducer, []);
  }
}

export const todoRepository = new TodoRepository();


