import { Either, left, right } from '@/shared/either';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';
import { ResourceNotFound } from './errors/resource-not-found';
import { NotAllowedError } from './errors/not-allowed-error';

type DeleteAnswerCommentUseCaseRequest = {
  authorId: string;
  answerCommentId: string;
};

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFound | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      return left(new ResourceNotFound());
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerCommentRepository.delete(answerCommentId);

    return right({});
  }
}
