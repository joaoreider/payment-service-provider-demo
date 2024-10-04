import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from '../../services/payable.service';
import { CreatePayableDTO } from '../../dto/create-payable.dto';
import { PaymentMethod } from '../../entities/transaction.entity';
import { PayableStatus } from '../../entities/payable.entity';
import { THIRTY_DAYS } from '../../../../libs/commons/constants/app.constants';

describe('PayableService', () => {
  let service: PayableService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableService],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should build payable for credit payment method', () => {
    const createPayableDto: CreatePayableDTO = {
      value: 100,
      paymentMethod: PaymentMethod.CREDIT,
      clientId: 'client1',
    };

    const result = service.build(createPayableDto);

    expect(result.value).toBe(95);
    expect(result.status).toBe(PayableStatus.WAITING_FUNDS);
    // Ensure the payment date is approximately 30 days from now with a 10ms margin of error
    expect(result.paymentDate.getTime()).toBeCloseTo(
      new Date(new Date().getTime() + THIRTY_DAYS).getTime(),
      -1,
    );
    expect(result.fee).toBe(5);
    expect(result.clientId).toBe(createPayableDto.clientId);
  });

  it('should build payable for debit payment method', () => {
    const createPayableDto: CreatePayableDTO = {
      value: 100,
      paymentMethod: PaymentMethod.DEBIT,
      clientId: 'client2',
    };

    const result = service.build(createPayableDto);

    expect(result.value).toBe(97);
    expect(result.status).toBe(PayableStatus.PAID);
    expect(result.paymentDate.getTime()).toBeCloseTo(new Date().getTime(), -1);
    expect(result.fee).toBe(3);
    expect(result.clientId).toBe(createPayableDto.clientId);
  });

  it('should throw error for unsupported payment method', () => {
    const createPayableDto: CreatePayableDTO = {
      value: 100,
      paymentMethod: 'UNSUPPORTED' as PaymentMethod,
      clientId: 'client3',
    };

    expect(() => service.build(createPayableDto)).toThrow(
      'Unsupported payment method',
    );
  });
});
