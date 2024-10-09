import { z } from 'zod';

const paymentValidationSchema = z.object({
  body: z.object({
    expiredDate: z.string({ required_error: 'Expired date is required' }),
  }),
});

export { paymentValidationSchema };
