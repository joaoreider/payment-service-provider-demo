import { IdempotencyKey } from '../entities/IdempotencyKey.entity';

export interface RequestCreateIdempotencyKey
  extends Omit<IdempotencyKey, 'id' | 'createdAt'> {}
export interface CreatedIdIdempotencyKey extends IdempotencyKey {}
export interface IdempotencyKeyResponse extends IdempotencyKey {}

export default abstract class IdempotencyKeyRepository {
  abstract create(
    requestCreateTransaction: RequestCreateIdempotencyKey,
  ): Promise<IdempotencyKey>;
  abstract getIdempotencyKey(
    key: string,
  ): Promise<IdempotencyKeyResponse | null>;
}
