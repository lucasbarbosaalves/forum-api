import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';

type DeleteQuestionUseCaseRequest = {
  authorId: string;
  questionId: string;
};

type DeleteQuestionUseCaseResponse = {
  question: Question;
};

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Unauthorized');
    }

    await this.questionRepository.delete(question);

    return { question };
  }
}
