import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';

export abstract class QuestionCommentRepository {
  abstract create(questionComment: QuestionComment): Promise<void>;
  abstract findById(id: string): Promise<QuestionComment | null>;
  abstract delete(id: string): Promise<void>;
  abstract findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>;
  abstract findManyByQuestionIdWithAuthor(questionId: string, params: PaginationParams): Promise<CommentWithAuthor[]>;
}
