import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

type FetchQuestionAnswersUseCaseRequest = {
  page: number;
  questionId: string;
};

type FetchQuestionAnswersUseCaseResponse = {
  answers: Answer[];
};

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      {
        page,
      }
    );
    return { answers };
  }
}
