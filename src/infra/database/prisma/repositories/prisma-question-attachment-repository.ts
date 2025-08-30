import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper';

@Injectable()
export class PrismaQuestionAttachmentRepository implements QuestionAttachmentRepository {
  constructor(private prisma: PrismaService) {}
  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const attachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    });

    return attachments.map((attachment) => {
      return PrismaQuestionAttachmentMapper.toDomain(attachment);
    });
  }
  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    });
  }
}
