import { Entity } from '@/shared/domain/entities/entity';
import { UniqueEntityID } from './value-objects/unique-entity-id';
import { Optional } from '@/shared/types/optional';
import { CommentProps } from './comment';

interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
    return questionComment;
  }

  get questionId(): UniqueEntityID {
    return this.props.questionId;
  }
}
