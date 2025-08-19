import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository';
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event';
import { DomainEvents } from '@/shared/events/domain-events';
import { EventHandler } from '@/shared/events/event-handler';
import { SendNotification } from '../use-cases/send-notification';

/**
 * Event handler for the `AnswerCreatedEvent`.
 *
 * The `OnAnswerCreated` class subscribes to the `AnswerCreatedEvent` domain event
 * and triggers a notification action when a new answer is created.
 *
 * @implements {EventHandler}
 *
 * @method setupSubscriptions Registers the `sendNewAnswerNotification` method as a handler for the `AnswerCreatedEvent`.
 * @method sendNewAnswerNotification Handles the event by executing notification logic when a new answer is created.
 */
export class OnAnswerCreated implements EventHandler {
  constructor(private questionRepository: QuestionRepository, private sendNotification: SendNotification) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name);
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(answer.questionId.toString());

    if (question) {
      await this.sendNotification.execute({
        recipientId: question?.authorId.toString(),
        title: `New answer at  "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.excerpt,
      });
    }
  }
}
