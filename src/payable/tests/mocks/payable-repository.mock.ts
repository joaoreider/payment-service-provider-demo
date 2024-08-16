import { payable1, payable2 } from '../examples/payable-examples';

export const PayableRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(payable1),
  findAll: jest.fn().mockResolvedValue([payable1, payable2]),
  create: jest.fn(),
  getAvailableBalance: jest.fn().mockResolvedValue(300),
  getPendingBalance: jest.fn().mockResolvedValue(600),
};
