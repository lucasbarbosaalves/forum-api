import { ValueObject } from '@/shared/domain/entities/value-object';
import { UniqueEntityID } from './unique-entity-id';
import { Slug } from './slug';
import { Attachment } from '../attachment';

export type QuestionDetailsProps = {
  questionId: UniqueEntityID;
  authorId: UniqueEntityID;
  author: string;
  title: string;
  content: string;
  slug: Slug;
  attachments: Attachment[];
  bestAnswerId?: UniqueEntityID | null;
  createdAt: Date;
  updatedAt?: Date | null;
};

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  constructor(props: QuestionDetailsProps) {
    super(props);
  }

  static create(props: QuestionDetailsProps) {
    return new QuestionDetails(props);
  }

  get questionId() {
    return this.props.questionId;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get attachments() {
    return this.props.attachments;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
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
