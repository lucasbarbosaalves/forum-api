import { faker } from '@faker-js/faker';
import { Attachment, AttachmentProps } from '@/domain/forum/enterprise/entities/attachment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-attachment-mapper';
import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';

export function makeAttachment(override: Partial<AttachmentProps> = {}, id?: UniqueEntityID) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      link: faker.lorem.slug(),
      ...override,
    },
    id
  );

  return attachment;
}

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(data: Partial<AttachmentProps> = {}): Promise<Attachment> {
    const attachment = makeAttachment(data);

    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment),
    });

    return attachment;
  }
}
