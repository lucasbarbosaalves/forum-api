import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachment-repository';
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository';
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment-repository';
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository';
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository';
import { StudentRepository } from '@/domain/forum/application/repositories/student-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachment-repository';
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comment-repository';
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository';
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachment-repository';
import { PrismaQuestionCommentRepository } from './prisma/repositories/prisma-question-comment-repository';
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question-repository';
import { PrismaStudentRepository } from './prisma/repositories/prisma-student-repository';
import { AttachmentRepository } from '@/domain/forum/application/repositories/attachment-repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachment-repository';
import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';

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
    {
      provide: QuestionCommentRepository,
      useClass: PrismaQuestionCommentRepository,
    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionAttachmentRepository,
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: AnswerCommentRepository,
      useClass: PrismaAnswerCommentRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentRepository,
    },

    {
      provide: AttachmentRepository,
      useClass: PrismaAttachmentsRepository,
    },

    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionRepository,
    StudentRepository,
    QuestionCommentRepository,
    QuestionAttachmentRepository,
    AnswerRepository,
    AnswerCommentRepository,
    AnswerAttachmentsRepository,
    AttachmentRepository,
    NotificationRepository,
  ],
})
export class DatabaseModule {}
