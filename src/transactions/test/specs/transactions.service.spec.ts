import { Test, TestingModule } from '@nestjs/testing';
import TransactionRepository from '../../repositories/transaction.repository';
import { TransactionsService } from '../../transactions.service';
import { TransactionRepositoryMock } from '../mocks/transaction-repository.mock';
import { createTransactionExamples } from '../examples/create-transaction';

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

  describe('create', () => {
    it('should create a transaction with masked card number and return it', async () => {
      const transaction = await service.create(createTransactionExamples.valid);
      expect(transaction.id).toBeDefined();
      expect(transaction.clientId).toBe(
        createTransactionExamples.valid.clientId,
      );
      expect(transaction.value).toBe(createTransactionExamples.valid.value);
      expect(transaction.description).toBe(
        createTransactionExamples.valid.description,
      );
      expect(transaction.paymentMethod).toBe(
        createTransactionExamples.valid.paymentMethod,
      );
      expect(transaction.cardNumber).toBe(5678);
      expect(transaction.cardHolder).toBe(
        createTransactionExamples.valid.cardHolder,
      );
      expect(transaction.cardExpiry).toBe(
        createTransactionExamples.valid.cardExpiry,
      );
      expect(transaction.cvv).toBe(createTransactionExamples.valid.cvv);
    });

    it.skip('should throw NotFoundException if client is not found', async () => {});
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
      const transactions = await service.findAll();
      expect(transactions).toHaveLength(2);
    });
  });
});
