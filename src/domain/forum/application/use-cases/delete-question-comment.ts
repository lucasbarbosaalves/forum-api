import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';

type DeleteQuestionCommentUseCaseRequest = {
  authorId: string;
  questionCommentId: string;
};

type DeleteQuestionCommentUseCaseResponse = {
  questionComment: QuestionComment;
};

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
      throw new Error('Question comment not found');
    }

    if (authorId) {
    }

    await this.questionCommentRepository.delete(questionCommentId);

    return { questionComment };
  }
}
