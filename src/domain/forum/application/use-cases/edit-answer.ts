import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

type EditAnswerUseCaseRequest = {
  authorId: string;
  questionId: string;
  content: string;
};

type EditAnswerUseCaseResponse = {
  answer: Answer;
};

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    questionId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(questionId);

    if (!answer) {
      throw new Error('Question not found');
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Unauthorized to edit this answer');
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return { answer };
  }
}
