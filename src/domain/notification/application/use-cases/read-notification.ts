import { Either, left, right } from '@/shared/either';

import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error';
import { ResourceNotFound } from '@/domain/forum/application/use-cases/errors/resource-not-found';
import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';

type ReadNotificationUseCaseRequest = {
  recipientId: string;
  notificationId: string;
};

type ReadNotificationResponse = Either<
  ResourceNotFound | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({ notificationId, recipientId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationResponse> {
    const notification = await this.notificationRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFound());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationRepository.save(notification);

    return right({ notification });
  }
}
