import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { AnswerComment } from '../../enterprise/entities/answer-comment';

export abstract class AnswerCommentRepository {
  abstract create(answerComment: AnswerComment): Promise<void>;
  abstract findById(id: string): Promise<AnswerComment | null>;
  abstract delete(id: string): Promise<void>;
  abstract findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>;
}
