import type { Answer } from '../../enterprise/entities/answer';

export interface AnswerRepository {
  save(question: Answer): Promise<void>;
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  delete(answer: Answer): Promise<void>;
}
