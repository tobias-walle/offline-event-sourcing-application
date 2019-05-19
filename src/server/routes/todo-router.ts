import { Router } from 'express';
import { Todo } from '../../shared/models/todo';

export const todoRouter = Router();

todoRouter.get("/", (req, res) => {
  const todos: Todo[] = [
    { name: 'Cleanup', isDone: false },
    { name: 'Buy Groceries', isDone: false },
  ];
  res.send(todos);
});

todoRouter.post("/", (req, res) => {
  const todo = req.body;
  console.log('CREATE TODO');
});

todoRouter.post("/:id", (req, res) => {
  const todoId = req.params['id'];
  console.log(`UPDATE TODO with id ${todoId}`);
});

todoRouter.delete("/:id", (req, res) => {
  const todoId = req.params['id'];
  console.log(`DELETE TODO with id ${todoId}`);
});
