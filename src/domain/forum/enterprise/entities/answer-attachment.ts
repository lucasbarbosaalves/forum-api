import { Entity } from '@/shared/domain/entities/entity';
import { UniqueEntityID } from './value-objects/unique-entity-id';

type AnswerAttachmentProps = {
  answerId: UniqueEntityID;
  attachmentId: UniqueEntityID;
};

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    return new AnswerAttachment(props, id);
  }

  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }
}
