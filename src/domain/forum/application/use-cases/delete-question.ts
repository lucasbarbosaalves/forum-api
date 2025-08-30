import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/shared/either';
import { ResourceNotFound } from './errors/resource-not-found';
import { NotAllowedError } from './errors/not-allowed-error';
import { Injectable } from '@nestjs/common';

type DeleteQuestionUseCaseRequest = {
  authorId: string;
  questionId: string;
};

type DeleteQuestionUseCaseResponse = Either<ResourceNotFound | NotAllowedError, { question: Question }>;

@Injectable()
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFound());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionRepository.delete(question);

    return right({ question });
  }
}
