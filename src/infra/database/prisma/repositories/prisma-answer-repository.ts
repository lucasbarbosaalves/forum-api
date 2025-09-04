import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { Injectable } from '@nestjs/common';
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper';
import { PrismaService } from '../prisma.service';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachment-repository';
import { DomainEvents } from '@/shared/events/domain-events';

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  constructor(private prisma: PrismaService, private answerAttachmentRepository: AnswerAttachmentsRepository) {}

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);
    await this.prisma.answer.update({
      where: {
        id: data.id,
      },
      data,
    });
    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: answer.id.toString(),
        },
        data,
      }),
      this.answerAttachmentRepository.createMany(answer.attachments.getNewItems()),
      this.answerAttachmentRepository.deleteMany(answer.attachments.getRemovedItems()),
      DomainEvents.dispatchEventsForAggregate(answer.id),
    ]);
  }
  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);
    await this.prisma.answer.create({
      data,
    });
    await this.answerAttachmentRepository.createMany(answer.attachments.getItems());
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }
  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) return null;

    return PrismaAnswerMapper.toDomain(answer);
  }
  async delete(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);
    await this.prisma.answer.delete({
      where: {
        id: data.id,
      },
    });
  }
  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      skip: (page - 1) * 10,
      take: 10,
    });

    return answers.map((answer) => {
      return PrismaAnswerMapper.toDomain(answer);
    });
  }
}
