import { UniqueEntityID } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { Comment, CommentProps } from './comment';
import { Optional } from '@/shared/types/optional';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityID) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return questionComment;
  }

  get questionId() {
    return this.props.questionId;
  }
}
