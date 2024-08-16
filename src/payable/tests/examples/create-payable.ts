import { PaymentMethod } from '../../../transactions/entities/transaction.entity';

export const createPayableExamples = {
  validDebitMethod: {
    value: 500.0,
    paymentMethod: PaymentMethod.DEBIT,
    clientId: 'client_123',
    transactionId: 'trans_abc123',
  },
  validCreditMethod: {
    value: 1500.0,
    paymentMethod: PaymentMethod.CREDIT,
    clientId: 'client_123',
    transactionId: 'trans_abc123',
  },
};
