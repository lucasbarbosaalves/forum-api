import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import type { Answer } from '../../enterprise/entities/answer';

export abstract class AnswerRepository {
  abstract save(question: Answer): Promise<void>;
  abstract create(answer: Answer): Promise<void>;
  abstract findById(id: string): Promise<Answer | null>;
  abstract delete(answer: Answer): Promise<void>;
  abstract findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
}
