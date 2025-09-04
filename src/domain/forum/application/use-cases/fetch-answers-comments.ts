import { Either, right } from '@/shared/either';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';

type FetchAnswerCommentsRequest = {
  answerId: string;
  page: number;
};

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[];
  }
>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}
  async execute({ page, answerId }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments = await this.answerCommentRepository.findManyByAnswerIdWithAuthor(answerId, { page });
    return right({ comments });
  }
}
