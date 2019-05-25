import { Router } from 'express';
import { TodoEvent } from '../../shared/events/todo-events';
import { todoRepository } from '../repositories/todo-repository';

export const todoRouter = Router();

todoRouter.get("/", async (req, res) => {
  res.status(200);
  res.send(await todoRepository.getTodoState());
});

todoRouter.post("/events", async (req, res) => {
  if (!(req.body instanceof Array)) {
    res.status(400).send();
  }
  const events: TodoEvent[] = req.body;
  await todoRepository.addEvents(events);
  res.status(204).send();
});

todoRouter.delete("/events", async (req, res) => {
  await todoRepository.deleteAllEvents();
  res.status(204).send();
});
