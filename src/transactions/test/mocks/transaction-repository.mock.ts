import {
  exampleTransaction1,
  exampleTransaction2,
} from '../examples/transaction-examples';

export const TransactionRepositoryMock = {
  findAll: jest
    .fn()
    .mockResolvedValue([exampleTransaction1, exampleTransaction2]),
  create: jest.fn().mockResolvedValue(exampleTransaction1),
};
