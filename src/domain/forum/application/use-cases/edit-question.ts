import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';

type EditQuestionUseCaseRequest = {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
};

type EditQuestionUseCaseResponse = {
  question: Question;
};

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Unauthorized');
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return { question };
  }
}
