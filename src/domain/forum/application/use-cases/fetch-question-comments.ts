import { Either, right } from '@/shared/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { Injectable } from '@nestjs/common';

type FetchQuestionCommentsRequest = {
  questionId: string;
  page: number;
};

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questions: QuestionComment[];
  }
>;

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}
  async execute({ page, questionId }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questions = await this.questionCommentRepository.findManyByQuestionId(questionId, { page });
    return right({ questions });
  }
}
