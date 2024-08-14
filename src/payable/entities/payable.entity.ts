export enum PayableStatus {
  PAID = 'PAID',
  WAITING_FUNDS = 'WAITING_FUNDS',
}

export class Payable {
  id: string;
  value: number;
  status: string;
  paymentDate: Date;
  fee: number;
  clientId: string;
  transactionId: string;
}
