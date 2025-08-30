import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';
import { Injectable } from '@nestjs/common';
import { Either, right } from '@/shared/either';

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return right({
      answers,
    });
  }
}
