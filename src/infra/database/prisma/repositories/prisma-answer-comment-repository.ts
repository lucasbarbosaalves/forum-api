import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAnswerCommentRepository implements AnswerCommentRepository {
  constructor(private prisma: PrismaService) {}

  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.');
  }
  // Implement repository methods here
}
