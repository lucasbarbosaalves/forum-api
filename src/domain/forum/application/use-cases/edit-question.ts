import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/shared/either';
import { ResourceNotFound } from './errors/resource-not-found';
import { NotAllowedError } from './errors/not-allowed-error';
import { QuestionAttachmentRepository } from '../repositories/question-attachment-repository';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment.list';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id';
import { Injectable } from '@nestjs/common';

type EditQuestionUseCaseRequest = {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsId: string[];
};

type EditQuestionUseCaseResponse = Either<ResourceNotFound | NotAllowedError, { question: Question }>;

@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionAttachmentRepository: QuestionAttachmentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFound());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachment = await this.questionAttachmentRepository.findManyByQuestionId(questionId);

    const currentQuestionAttachmentList = new QuestionAttachmentList(currentQuestionAttachment);

    const questionAttachments = attachmentsId.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    currentQuestionAttachmentList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = currentQuestionAttachmentList;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
