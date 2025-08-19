import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer';
import { DomainEvents } from '@/shared/events/domain-events';
import { EventHandler } from '@/shared/events/event-handler';
import { SendNotification } from '../use-cases/send-notification';
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository';

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(private answersRepository: AnswerRepository, private sendNotification: SendNotification) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), QuestionBestAnswerChosenEvent.name);
  }

  private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(bestAnswerId.toString());

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')}" foi escolhida pelo autor!"`,
      });
    }
  }
}
