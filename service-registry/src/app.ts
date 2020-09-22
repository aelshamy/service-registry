import { json } from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import log from '../../common/src/logger';
import HttpException from './errors/http-exception';
import createRoute from './routes/create';
import deleteRoute from './routes/delete';
import findRoute from './routes/find';

const app = express();

if (app.get('env') === 'development') {
  app.use((req, res, next) => {
    log.debug(`${req.method}: ${req.url}`);
    return next();
  });
}

app.use(json());

app.use(createRoute);
app.use(deleteRoute);
app.use(findRoute);

app.use(
  (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    log.error(error);
    return res.status(status).send({
      status,
      message,
    });
  }
);

export default app;
