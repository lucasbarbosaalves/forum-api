import { BadRequestException, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-context';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ChooseBestAnswerQuestionUseCase } from '@/domain/forum/application/use-cases/choose-best-answer-question';

@Controller('/answers/:answerId/choose-as-best')
export class ChooseBestAnswerQuestionController {
  constructor(private chooseBestAnswer: ChooseBestAnswerQuestionUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('answerId') answerId: string) {
    const userId = user.sub;

    const result = await this.chooseBestAnswer.execute({
      authorId: userId,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
