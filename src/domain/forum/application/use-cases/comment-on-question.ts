import { Question } from '../../enterprise/entities/question';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/shared/either';
import { ResourceNotFound } from './errors/resource-not-found';
import { Injectable } from '@nestjs/common';

type CommentOnQuestionUseCaseRequest = {
  authorId: string;
  questionId: string;
  content: string;
};

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFound, { questionComment: QuestionComment }>;

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFound());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentRepository.create(questionComment);

    return right({ questionComment });
  }
}
