import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';
import { CurrentUser } from '@/infra/auth/current-user-context';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { BadRequestException, Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(private useCase: DeleteQuestionUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') questionId: string, @CurrentUser() userPayload: UserPayload): Promise<void> {
    const result = await this.useCase.execute({ questionId, authorId: userPayload.sub });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
