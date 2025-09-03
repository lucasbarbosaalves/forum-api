import { ValueObject } from '@/shared/domain/entities/value-object';
import { UniqueEntityID } from './unique-entity-id';

export type CommentWithAuthorProps = {
  commentId: UniqueEntityID;
  content: string;
  authorId: UniqueEntityID;
  author: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  constructor(props: CommentWithAuthorProps) {
    super(props);
  }

  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props);
  }
  get commentId() {
    return this.props.commentId;
  }

  get content() {
    return this.props.content;
  }

  get author() {
    return this.props.author;
  }

  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
