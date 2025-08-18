import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';

type FetchAnswerCommentsRequest = {
  answerId: string;
  page: number;
};

type FetchAnswerAnswersUseCaseResponse = {
  answers: AnswerComment[];
};

export class FetchAnswerAnswersUseCase {
  constructor(private answerCommentRepositoy: AnswerCommentRepository) {}
  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerAnswersUseCaseResponse> {
    const answers = await this.answerCommentRepositoy.findManyByAnswerId(
      answerId,
      { page }
    );
    return { answers };
  }
}
