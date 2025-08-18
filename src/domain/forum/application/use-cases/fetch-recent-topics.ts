import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';

type FetchRecentQuestionsUseCaseRequest = {
  page: number;
};

type FetchRecentQuestionsUseCaseResponse = {
  questions: Question[];
};

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({
      page,
    });
    return { questions };
  }
}
