import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  private readonly saltRounds = 10;

  async encrypt(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashed = await bcrypt.hash(data, salt);
    return hashed;
  }
}
