import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from '../../payable.service';
import PayableRepository from '../../repositories/payable.repository';
import { createPayableExamples } from '../examples/create-payable';
import { NotFoundException } from '@nestjs/common';
import { PayableRepositoryMock } from '../mocks/payable-repository.mock';
import { payable1, payable2 } from '../examples/payable-examples';
import { PayableStatus } from '../../../payable/entities/payable.entity';

describe('PayableService', () => {
  let service: PayableService;
  let payableRepository: PayableRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: PayableRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
    payableRepository = module.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payable for Debit payment', async () => {
      jest.spyOn(payableRepository, 'create').mockResolvedValue(payable2);

      const payable = await service.create(
        createPayableExamples.validDebitMethod,
      );
      expect(payable.id).toBeDefined();
      expect(payable.value).toBe(485); // fee 3%
      expect(payable.paymentDate.toDateString()).toEqual(
        new Date().toDateString(),
      );
      expect(payable.status).toBe(PayableStatus.PAID);
    });

    it('should create a payable for Credit payment', async () => {
      jest.spyOn(payableRepository, 'create').mockResolvedValue(payable1);
      const today = new Date();
      const expectedPaymentDate = new Date(
        today.getTime() + 30 * 24 * 60 * 60 * 1000,
      ); // Adiciona 30 dias em milissegundos

      const payable = await service.create(
        createPayableExamples.validCreditMethod,
      );
      expect(payable.id).toBeDefined();
      expect(payable.value).toBe(1425); // fee 5%
      expect(payable.paymentDate.toDateString()).toEqual(
        expectedPaymentDate.toDateString(),
      );
      expect(payable.status).toBe(PayableStatus.WAITING_FUNDS);
    });
  });

  describe('findAll', () => {
    it('should return all payables', async () => {
      const payables = await service.findAll();
      expect(payables).toHaveLength(2);
    });
  });

  describe('balance', () => {
    it('should return available and waiting funds balance for a client', async () => {
      const balance = await service.balance('client1');
      expect(balance.available).toBe(300);
      expect(balance.waitingFunds).toBe(600);
    });
  });

  describe('findOne', () => {
    it('should return a payable by id', async () => {
      const payable = await service.findOne('payable1');
      expect(payable.id).toBeDefined();
      expect(payable.value).toBe(1425);
    });

    it('should throw NotFoundException if payable is not found', async () => {
      jest.spyOn(payableRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne('not-found')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
