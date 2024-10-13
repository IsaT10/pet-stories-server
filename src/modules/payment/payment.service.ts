import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';
import Stripe from 'stripe';

const stripe = new Stripe(config.stripe_key as string);

const paymentWithStripe = async (payload: { amount: number }) => {
  const { amount } = payload;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount || 1 * 20),
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return paymentIntent.client_secret;
};

const paymentIntoDB = async (userId: string, payload: TPayment) => {
  const result = await Payment.create({ ...payload, user: userId });
  return result;
};

const getPaymentFromDB = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(
    Payment.find().populate({
      path: 'user',
      select: 'name status email',
    }),
    query
  )
    // .search()
    .fields()
    .sort()
    .filter();

  const result = await paymentQuery.queryModel;
  const meta = await paymentQuery.countTotal();

  return { meta, result };
};

export { paymentIntoDB, getPaymentFromDB, paymentWithStripe };
