import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { Either, right } from '@/shared/either';

import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification-repository';

type SendNotificationUseCaseRequest = {
  recipientId: string;
  title: string;
  content: string;
};

type SendNotificationResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({ content, recipientId, title }: SendNotificationUseCaseRequest): Promise<SendNotificationResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}
