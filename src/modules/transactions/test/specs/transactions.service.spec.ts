import { Test, TestingModule } from '@nestjs/testing';
import TransactionRepository from '../../repositories/transaction.repository';
import { TransactionRepositoryMock } from '../mocks/transaction-repository.mock';
import { TransactionsService } from '../../services/transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: TransactionRepository, useValue: TransactionRepositoryMock },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
