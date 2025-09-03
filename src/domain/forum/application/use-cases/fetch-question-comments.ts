import { Either, right } from '@/shared/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { Injectable } from '@nestjs/common';
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author';
import { r } from 'node_modules/@faker-js/faker/dist/airline-CHFQMWko';

type FetchQuestionCommentsRequest = {
  questionId: string;
  page: number;
};

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[];
  }
>;

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}
  async execute({ page, questionId }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments = await this.questionCommentRepository.findManyByQuestionIdWithAuthor(questionId, {
      page,
    });
    return right({
      comments,
    });
  }
}
