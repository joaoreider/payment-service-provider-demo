import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IdempotencyService } from '../services/idempotency.service';

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  constructor(private readonly idempotencyService: IdempotencyService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const idempotencyKey = req.headers['x-idempotency-key'] as string;
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency key is missing');
    }

    const cachedKey = await this.idempotencyService.getKey(idempotencyKey);

    if (cachedKey) {
      res.status(200).json(cachedKey);
      return;
    }

    res.on('finish', async () => {
      if (res.statusCode < 400) {
        await this.idempotencyService.saveKey(idempotencyKey);
      }
    });
    next();
  }
}
