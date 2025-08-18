import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import type { Answer } from '../../enterprise/entities/answer';

export interface AnswerRepository {
  save(question: Answer): Promise<void>;
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>;
}
