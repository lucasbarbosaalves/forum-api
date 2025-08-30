import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';

export abstract class QuestionCommentRepository {
  abstract create(questionComment: QuestionComment): Promise<void>;
  abstract findById(id: string): Promise<QuestionComment | null>;
  abstract delete(id: string): Promise<void>;
  abstract findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>;
}
