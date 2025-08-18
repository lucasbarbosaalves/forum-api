import { Either, right } from '@/shared/either';
import { Answer } from '../../enterprise/entities/answer';
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id';
import type { AnswerRepository } from '../repositories/answer-repository';

type AnswerQuestionUseCaseRequest = {
  instructorId: string;
  questionId: string;
  content: string;
};

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}
