import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';

type FetchQuestionCommentsRequest = {
  questionId: string;
  page: number;
};

type FetchQuestionQuestionsUseCaseResponse = {
  questions: QuestionComment[];
};

export class FetchQuestionQuestionsUseCase {
  constructor(private questionCommentRepositoy: QuestionCommentRepository) {}
  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionQuestionsUseCaseResponse> {
    const questions = await this.questionCommentRepositoy.findManyByQuestionId(
      questionId,
      { page }
    );
    return { questions };
  }
}
