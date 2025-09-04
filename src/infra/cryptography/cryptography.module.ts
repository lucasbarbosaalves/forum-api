import { Encrypter } from '@/domain/forum/application/cryptography/encrypter';
import { Hasher } from '@/domain/forum/application/cryptography/hasher';
import { Module } from '@nestjs/common';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    {
      provide: Hasher,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [Hasher, Encrypter],
})
export class CryptographyModule {}
