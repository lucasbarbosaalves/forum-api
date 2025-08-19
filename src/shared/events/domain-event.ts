import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';

export interface DomainEvent {
  occurredAt: Date;
  getAggregateId(): UniqueEntityID;
}
