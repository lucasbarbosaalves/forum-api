import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from './value-objects/unique-entity-id';
import { Slug } from './value-objects/slug';
import type { Optional } from '@/core/types/optional';

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  bestAnswerId?: UniqueEntityID;
  authorId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
    return question;
  }
}
