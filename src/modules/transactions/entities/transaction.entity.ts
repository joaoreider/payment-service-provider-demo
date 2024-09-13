export enum PaymentMethod {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export class Transaction {
  id: string;
  value: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cvv: number;
  clientId: string;
}
