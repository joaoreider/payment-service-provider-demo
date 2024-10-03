import { Test, TestingModule } from '@nestjs/testing';
import TransactionRepository from '../../repositories/transaction.repository';
import { TransactionsService } from '../../services/transactions.service';
import { ClientsService } from '../../../clients/clients.service';
import { PayableService } from '../../services/payable.service';
import { EncryptService } from '../../../../libs/commons/services/encryption.service';
import { payable } from '../examples/payable-examples';
import { createTransactionExamples } from '../examples/transaction-examples';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let clientService: ClientsService;
  let payableService: PayableService;
  let transactionRepository: TransactionRepository;
  let encryptService: EncryptService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: ClientsService,
          useValue: {
            validateClient: jest.fn(),
          },
        },
        {
          provide: PayableService,
          useValue: {
            build: jest.fn(),
          },
        },
        {
          provide: TransactionRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: EncryptService,
          useValue: {
            encrypt: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    clientService = module.get<ClientsService>(ClientsService);
    payableService = module.get<PayableService>(PayableService);
    transactionRepository = module.get<TransactionRepository>(
      TransactionRepository,
    );
    encryptService = module.get<EncryptService>(EncryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', async () => {
    // Arrange
    const dbTransaction = {
      ...createTransactionExamples.valid,
      cardNumber: 'encrypted',
    };
    const createdTransaction = {
      id: '1',
      ...createTransactionExamples.valid,
    };

    const client = {
      id: createTransactionExamples.valid.clientId,
      name: 'John',
    };

    jest.spyOn(clientService, 'validateClient').mockResolvedValueOnce(client);
    jest.spyOn(payableService, 'build').mockReturnValueOnce(payable);
    jest
      .spyOn(transactionRepository, 'create')
      .mockResolvedValueOnce(createdTransaction);
    jest.spyOn(encryptService, 'encrypt').mockResolvedValueOnce('encrypted');

    // Act
    const result = await service.create(createTransactionExamples.valid);

    // Assert
    expect(result).toEqual(createdTransaction);
    expect(clientService.validateClient).toHaveBeenCalledWith(
      createTransactionExamples.valid.clientId,
    );
    expect(payableService.build).toHaveBeenCalledWith(
      createTransactionExamples.valid,
    );
    expect(encryptService.encrypt).toHaveBeenCalledWith('5678');
    expect(transactionRepository.create).toHaveBeenCalledWith(
      dbTransaction,
      payable,
    );
  });

  // Maybe add tests for service failures, but it's doesn't seem necessary because this is a responsibility of the unit tests of each service
});
