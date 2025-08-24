import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from '../env/env';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthenticateController } from './http/controllers/authenticate.controller';
import { CreateAccountController } from './http/controllers/create-account.controller';
import { CreateQuestionController } from './http/controllers/create-question.controller';
import { GetRecentQuestionsController } from './http/controllers/get-recent-questions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    GetRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
