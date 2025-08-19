import { DomainEvent } from '@/shared/events/domain-event';
import { UniqueEntityID } from '../entities/value-objects/unique-entity-id';
import { Answer } from '../entities/answer';

export class AnswerCreatedEvent implements DomainEvent {
  public occurredAt: Date;
  public answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.occurredAt = new Date();
  }
  getAggregateId(): UniqueEntityID {
    return this.answer.id;
  }
}
