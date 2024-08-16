import { Controller, Get, Param } from '@nestjs/common';
import { PayableService } from './payable.service';

@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get(':clientId/balance')
  balance(@Param('clientId') clientId: string) {
    return this.payableService.balance(clientId);
  }
}
