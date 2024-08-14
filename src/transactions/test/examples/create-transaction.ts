import { PaymentMethod } from '../../entities/transaction.entity';

export const createTransactionExamples = {
  valid: {
    value: 250.0,
    description: 'Purchase at Electronics Store',
    paymentMethod: PaymentMethod.CREDIT,
    cardNumber: 1234567812345678,
    cardHolder: 'John Doe',
    cardExpiry: '12/25',
    cvv: 123,
    clientId: 'client-12345',
  },
  notFound: {
    value: 250.0,
    description: 'Purchase at Electronics Store',
    paymentMethod: PaymentMethod.CREDIT,
    cardNumber: 1234567812345678,
    cardHolder: 'John Doe',
    cardExpiry: '12/25',
    cvv: 123,
    clientId: 'notfound',
  },
};
