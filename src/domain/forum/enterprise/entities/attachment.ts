import { Entity } from '@/shared/domain/entities/entity';
import { UniqueEntityID } from './value-objects/unique-entity-id';

export type AttachmentProps = {
  title: string;
  link: string;
};

export class Attachment extends Entity<AttachmentProps> {
  static create(props: AttachmentProps, id?: UniqueEntityID) {
    return new Attachment(props, id);
  }

  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }
}
