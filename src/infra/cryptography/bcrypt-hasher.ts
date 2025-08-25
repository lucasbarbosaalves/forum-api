import { Hasher } from '@/domain/forum/application/cryptography/hasher';
import { Injectable } from '@nestjs/common';
import bcrypt from 'node_modules/bcryptjs/umd/types';

@Injectable()
export class BcryptHasher implements Hasher {
  private readonly HASH_SALT_ROUNDS = 10;

  hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.HASH_SALT_ROUNDS);
  }
  compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
