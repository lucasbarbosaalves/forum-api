import { PaginationParams } from '@/shared/domain/repositories/pagination-params';
import { Question } from '@/domain/forum/enterprise/entities/question';

export interface QuestionRepository {
  save(question: Question): Promise<void>;
  create(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
