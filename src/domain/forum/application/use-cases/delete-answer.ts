import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

type DeleteAnswerUseCaseRequest = {
  authorId: string;
  answerId: string;
};

type DeleteAnswerUseCaseResponse = {
  answer: Answer;
};

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Unauthorized');
    }

    await this.answerRepository.delete(answer);

    return { answer };
  }
}
