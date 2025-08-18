import { Optional } from '@/shared/types/optional';
import { Comment, CommentProps } from './comment';
import { UniqueEntityID } from './value-objects/unique-entity-id';

interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
    return answerComment;
  }

  public get answerId() {
    return this.props.answerId;
  }
}
