import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from '../env/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<Env> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true }) || 3000;

  await app.listen(port);
}
bootstrap();
