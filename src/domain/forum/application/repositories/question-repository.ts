import { Question } from '../../enterprise/entities/question';

export interface QuestionRepository {
  save(question: Question): Promise<void>;
  create(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
