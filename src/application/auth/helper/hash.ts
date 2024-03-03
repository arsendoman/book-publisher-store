import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class HashHelper {
  hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
