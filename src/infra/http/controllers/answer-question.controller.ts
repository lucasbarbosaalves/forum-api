import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { CurrentUser } from '@/infra/auth/current-user-context';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipe/zod-validation-pipe';
import { BadRequestException, Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import z from 'zod';

const answerQuestionBody = z.object({
  content: z.string(),
  attachments: z.array(z.uuid()),
});

type AnswerQuestionBody = z.infer<typeof answerQuestionBody>;

@Controller('/questions/:questionId/answers')
@UseGuards(JwtAuthGuard)
export class AnswerQuestionController {
  constructor(private useCase: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(answerQuestionBody)) body: AnswerQuestionBody,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string
  ) {
    const { content, attachments } = body;
    const userId = user.sub;

    const result = await this.useCase.execute({
      content,
      questionId,
      instructorId: userId,
      attachmentsIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
