export class TransactionResponse {
  id: string;
  value: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cvv: number;
  clientId: string;

  constructor(partial: Partial<TransactionResponse>) {
    Object.assign(this, partial);
  }
}
