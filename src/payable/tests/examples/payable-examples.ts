import { THIRTY_DAYS } from '../../../constants';
import {
  Payable,
  PayableStatus,
} from '../../../payable/entities/payable.entity';

export const payable1: Payable = {
  id: 'payable_001',
  value: 1425.0,
  status: PayableStatus.WAITING_FUNDS,
  paymentDate: new Date(new Date().getTime() + THIRTY_DAYS),
  fee: 5,
  clientId: 'client_123',
  transactionId: 'trans_abc123',
};

export const payable2: Payable = {
  id: 'payable_002',
  value: 485.0,
  status: PayableStatus.PAID,
  paymentDate: new Date(),
  fee: 3,
  clientId: 'client_123',
  transactionId: 'trans_abc123',
};
