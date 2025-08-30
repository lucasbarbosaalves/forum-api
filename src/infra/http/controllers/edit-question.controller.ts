import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { QuestionPresenter } from '../presenters/question-presenter';
import z from 'zod';
import { CurrentUser } from '@/infra/auth/current-user-context';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '../pipe/zod-validation-pipe';

const editQuestionBody = z.object({
  title: z.string(),
  content: z.string(),
});

type EditQuestionBody = z.infer<typeof editQuestionBody>;

const bodyValidationPipe = new ZodValidationPipe(editQuestionBody);

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Body(bodyValidationPipe) body: EditQuestionBody,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body;
    const result = await this.editQuestion.execute({
      questionId: id,
      title,
      content,
      authorId: user.sub,
      attachmentsId: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { question: QuestionPresenter.toHTTP(result.value.question) };
  }
}
