import { CurrentUser } from '@/infra/auth/current-user-context';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipe/zod-validation-pipe';
import { PrismaService } from '@/infra/prisma/prisma.service';
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
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBody)) body: CreateQuestionBody,
    @CurrentUser() user: UserPayload
  ) {
    const { title, content } = body;

    await this.prisma.question.create({
      data: {
        authorId: user.sub,
        title,
        content,
        slug: this.convertToSlug(title),
      },
    });
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}
