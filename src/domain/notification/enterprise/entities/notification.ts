import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { Entity } from '@/shared/domain/entities/entity';
import { Optional } from '@/shared/types/optional';

type NotificationProps = {
  recipientId: UniqueEntityID;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
};

export class Notification extends Entity<NotificationProps> {
  static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityID): Notification {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
    return notification;
  }

  public get recipientId(): UniqueEntityID {
    return this.props.recipientId;
  }

  public get title(): string {
    return this.props.title;
  }

  public get content(): string {
    return this.props.content;
  }

  public get readAt(): Date | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  read() {
    this.props.readAt = new Date();
  }
}
