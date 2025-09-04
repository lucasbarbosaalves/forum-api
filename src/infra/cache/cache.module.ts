import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { CacheRepository } from './cache-repository';
import { RedisCacheRespository } from './redis/redis-cache-repository';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [EnvModule],
  providers: [
    EnvService,
    RedisService,
    {
      provide: CacheRepository,
      useClass: RedisCacheRespository,
    },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
