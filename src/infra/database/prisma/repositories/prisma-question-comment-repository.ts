import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { PrismaService } from '../prisma.service';

export class PrismaQuestionCommentRepository implements QuestionCommentRepository {
  constructor(private prisma: PrismaService) {}
  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.');
  }
}
