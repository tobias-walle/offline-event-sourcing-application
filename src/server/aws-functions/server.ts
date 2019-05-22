import serverlessHttp from 'serverless-http/serverless-http';
import { app } from '../app';

module.exports.handler = serverlessHttp(app);
