import { Either, left, right } from '@/shared/either';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { ResourceNotFound } from './errors/resource-not-found';

type DeleteQuestionCommentUseCaseRequest = {
  authorId: string;
  questionCommentId: string;
};

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFound, {}>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      return left(new ResourceNotFound());
    }

    if (authorId) {
    }

    await this.questionCommentRepository.delete(questionCommentId);

    return right({});
  }
}
