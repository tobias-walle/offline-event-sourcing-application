import serverlessHttp from 'serverless-http/serverless-http';
import { app } from '../express/app';

module.exports.handler = serverlessHttp(app);
