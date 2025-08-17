import { Question } from '../../enterprise/entities/question';
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question-gateway';

type CreateQuestionUseCaseRequest = {
  authorId: string;
  title: string;
  content: string;
};

type CreateQuestionUseCaseResponse = {
  question: Question;
};

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    await this.questionRepository.create(question);

    return { question };
  }
}
