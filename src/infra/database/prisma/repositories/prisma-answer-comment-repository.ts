import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { Injectable } from '@nestjs/common';
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper';
import { PrismaService } from '../prisma.service';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-question-with-author-mapper';

@Injectable()
export class PrismaAnswerCommentRepository implements AnswerCommentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: AnswerComment): Promise<void> {
    const prismaData = PrismaAnswerCommentMapper.toPrisma(data);
    await this.prisma.comment.create({
      data: prismaData,
    });
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const comment = await this.prisma.comment.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return PrismaAnswerCommentMapper.toDomain(comment);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams): Promise<AnswerComment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      skip: (page - 1) * 10,
      take: 10,
    });
    return comments.map(PrismaAnswerCommentMapper.toDomain);
  }

  async findManyByAnswerIdWithAuthor(answerId: string, { page }: PaginationParams): Promise<CommentWithAuthor[]> {
    const commentsWithAuthor = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      skip: (page - 1) * 10,
      take: 10,
      include: {
        author: true,
      },
    });

    return commentsWithAuthor.map(PrismaCommentWithAuthorMapper.toDomain);
  }
}
