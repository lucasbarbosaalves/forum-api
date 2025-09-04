import { Entity } from '@/shared/domain/entities/entity';
import type { Optional } from '@/shared/types/optional';
import type { UniqueEntityID } from './value-objects/unique-entity-id';
import { AnswerAttachmentList } from './answer-attachment-list';
import { AggregateRoot } from '@/shared/domain/entities/aggregate-root';
import { AnswerCreatedEvent } from '../events/answer-created-event';

interface AnswerProps {
  content: string;
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Answer extends AggregateRoot<AnswerProps> {
  static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityID) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
    const isNewAnswer = !id;

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer));
    }

    return answer;
  }
  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...');
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }
}
