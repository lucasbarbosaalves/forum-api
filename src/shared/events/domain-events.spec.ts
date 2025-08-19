import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { AggregateRoot } from '../domain/entities/aggregate-root';
import { DomainEvent } from '../events/domain-event';
import { vi } from 'vitest';
import { DomainEvents } from './domain-events';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', async () => {
    const callbackSpy = vi.fn(); // spy on the callback

    // Subscriber created
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Creating an aggregate without saving it to the database
    const aggregate = CustomAggregate.create();

    // Ensuring the event was created but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1);

    // Saving the aggregate to the database and thus dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // The subscriber listens to the event and does what needs to be done with the data
    expect(callbackSpy).toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
