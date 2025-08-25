import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository';
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question-repository';
import { StudentRepository } from '@/domain/forum/application/repositories/student-repository';
import { PrismaStudentRepository } from './prisma/repositories/prisma-student-repository';
import { Prisma } from '@prisma/client';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionRepository,
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository,
    },
  ],
  exports: [PrismaService, QuestionRepository, StudentRepository],
})
export class DatabaseModule {}
