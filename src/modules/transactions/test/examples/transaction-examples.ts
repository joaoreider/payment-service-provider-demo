import { CreateTransactionDTO } from '../../dto/create-transaction.dto';
import { PaymentMethod, Transaction } from '../../entities/transaction.entity';

export const exampleTransaction1: Transaction = {
  id: '1',
  value: 250.0,
  description: 'Purchase at Electronics Store',
  paymentMethod: PaymentMethod.CREDIT,
  cardNumber: '5678',
  cardHolder: 'John Doe',
  cardExpiry: '12/25',
  cvv: 123,
  clientId: 'client-12345',
};

export const exampleTransaction2: Transaction = {
  id: '2',
  value: 75.5,
  description: 'Online Bookstore Purchase',
  paymentMethod: PaymentMethod.DEBIT,
  cardNumber: '4321',
  cardHolder: 'Jane Smith',
  cardExpiry: '10/24',
  cvv: 456,
  clientId: 'client-67890',
};

export const createTransactionExamples = {
  valid: {
    value: 250.0,
    description: 'Purchase at Electronics Store',
    paymentMethod: PaymentMethod.CREDIT,
    cardNumber: '1234567812345678',
    cardHolder: 'John Doe',
    cardExpiry: '12/25',
    cvv: 123,
    clientId: '048ab22e-6a84-40c2-bd41-f355c4748754',
  } as CreateTransactionDTO,
};
