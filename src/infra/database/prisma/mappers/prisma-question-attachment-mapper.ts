import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { Prisma, Attachment as PrismaAttachment } from '@/generated/prisma';

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

  static toPrismaUpdateMany(attachments: QuestionAttachment[]): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString();
    });

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        questionId: attachments[0].questionId.toString(),
      },
    };
  }
}
