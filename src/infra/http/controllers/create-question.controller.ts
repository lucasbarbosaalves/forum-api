import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { CurrentUser } from '@/infra/auth/current-user-context';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipe/zod-validation-pipe';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import z from 'zod';

const createQuestionBody = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionBody = z.infer<typeof createQuestionBody>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private useCase: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBody)) body: CreateQuestionBody,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body;

    await this.useCase.execute({
      title,
      content,
      authorId: user.sub,
      attachmentsId: [],
    });
  }
}
