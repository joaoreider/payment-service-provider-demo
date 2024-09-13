export class BalanceResponse {
  available: number;
  waitingFunds: number;

  constructor(partial: Partial<BalanceResponse>) {
    Object.assign(this, partial);
  }
}
