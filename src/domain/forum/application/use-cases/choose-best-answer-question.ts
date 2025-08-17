import { Question } from '../../enterprise/entities/question';
import { AnswerRepository } from '../repositories/answer-repository';
import { QuestionRepository } from '../repositories/question-repository';

type ChooseBestAnswerQuestionUseCaseRequest = {
  authorId: string;
  answerId: string;
};

type ChooseBestAnswerQuestionUseCaseResponse = {
  question: Question;
};

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
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Unauthorized to choose this answer');
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return { question };
  }
}
