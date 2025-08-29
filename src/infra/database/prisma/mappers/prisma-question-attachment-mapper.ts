import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { Attachment as PrismaAttachment } from '@/generated/prisma';
export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid attachment type.');
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id)
    );
  }
}
