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

// app.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body; // Payment amount in smallest currency unit, e.g., cents for USD
//   console.log(amount);
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: parseInt(amount || 1 * 100), // Amount in cents
//       currency: 'usd', // Specify the currency
//       payment_method_types: ['card'],
//     });
//     console.log(paymentIntent);

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Payment method is not work properly' });
//   }
// });

// not found route
app.all('*', notFoundRoute);

// handle error globally
app.use(globalErrorHandler);

export default app;
