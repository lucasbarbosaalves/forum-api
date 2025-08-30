import { Either, right } from '@/shared/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';

type FetchAnswerCommentsRequest = {
  answerId: string;
  page: number;
};

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: AnswerComment[];
  }
>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}
  async execute({ page, answerId }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page });
    return right({ comments });
  }
}
