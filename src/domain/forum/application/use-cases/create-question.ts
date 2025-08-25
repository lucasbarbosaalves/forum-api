import { Injectable } from '@nestjs/common';
import { Question } from '../../enterprise/entities/question';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment.list';
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, right } from '@/shared/either';

type CreateQuestionUseCaseRequest = {
  authorId: string;
  title: string;
  content: string;
  attachmentsId: string[];
};

type CreateQuestionUseCaseResponse = Either<never, { question: Question }>;

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsId,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsId.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionRepository.create(question);

    return right({ question });
  }
}
