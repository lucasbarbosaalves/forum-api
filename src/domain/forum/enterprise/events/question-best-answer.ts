import { DomainEvent } from '@/shared/events/domain-event';
import { Question } from '../entities/question';
import { UniqueEntityID } from '../entities/value-objects/unique-entity-id';

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public occurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityID;

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.occurredAt = new Date();
  }
  getAggregateId(): UniqueEntityID {
    return this.question.id;
  }
}
