import { createTransactionExamples } from './transaction-examples';

export const payable = {
  value: 237.5,
  status: 'WAITING_FUNDS',
  paymentDate: new Date(new Date().getTime() + 2592000000),
  fee: 5,
  clientId: createTransactionExamples.valid.clientId,
};
