import { Question } from '../../enterprise/entities/question';
import { AnswerRepository } from '../repositories/answer-repository';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/shared/either';
import { ResourceNotFound } from './errors/resource-not-found';
import { NotAllowedError } from './errors/not-allowed-error';

type ChooseBestAnswerQuestionUseCaseRequest = {
  authorId: string;
  answerId: string;
};

type ChooseBestAnswerQuestionUseCaseResponse = Either<
  ResourceNotFound | NotAllowedError,
  { question: Question }
>;

export class ChooseBestAnswerQuestionUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseBestAnswerQuestionUseCaseRequest): Promise<ChooseBestAnswerQuestionUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      return left(new ResourceNotFound());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
