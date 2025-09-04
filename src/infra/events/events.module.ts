import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created';
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-best-question-aswer-chosen';
import { SendNotification } from '@/domain/notification/application/use-cases/send-notification';
import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [OnAnswerCreated, OnQuestionBestAnswerChosen, SendNotification],
})
export class EventsModule {}
