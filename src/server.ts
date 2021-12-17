import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import GlobalExceptionHandler from './middlewares/GlobalExceptionHandler';

import './database';

const app = express();
const globalExceptionHandler = new GlobalExceptionHandler();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) =>
  globalExceptionHandler.handler(err, request, response, _),
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
