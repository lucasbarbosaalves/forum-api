import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { Injectable } from '@nestjs/common';
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaQuestionCommentRepository implements QuestionCommentRepository {
  constructor(private prisma: PrismaService) {}
  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment);

    await this.prisma.comment.create({
      data,
    });
  }
  async findById(id: string): Promise<QuestionComment | null> {
    const result = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return PrismaQuestionCommentMapper.toDomain(result);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    });
  }
  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<QuestionComment[]> {
    const result = await this.prisma.comment.findMany({
      where: { questionId },
      skip: (page - 1) * 10,
      take: 10,
    });

    return result.map(PrismaQuestionCommentMapper.toDomain);
  }
}
