import { Entity } from '@/shared/domain/entities/entity';
import { UniqueEntityID } from './value-objects/unique-entity-id';

type QuestionAttachmentProps = {
  questionId: UniqueEntityID;
  attachmentId: UniqueEntityID;
};

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    return new QuestionAttachment(props, id);
  }

  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }
}
