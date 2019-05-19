import { Router } from 'express';
import { todoRouter } from './todo-router';

export const rootRouter = Router();

rootRouter.use('/todos', todoRouter);

