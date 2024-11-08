import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import globalErrorHandler from './middleware/globalErrorHandler';
import { notFoundRoute } from './error/noFoundRoute';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// initial server start
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'testing...' });
});

// api routes
app.use('/api/v1', router);

// not found route
app.all('*', notFoundRoute);

// handle error globally
app.use(globalErrorHandler);

export default app;
