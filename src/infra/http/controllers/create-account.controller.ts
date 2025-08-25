import { ZodValidationPipe } from '@/infra/http/pipe/zod-validation-pipe';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { BadRequestException, ConflictException, Get, HttpCode, UsePipes } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';
import z from 'zod';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';
import { right } from '@/shared/either';
import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error';
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@Controller('accounts')
export class CreateAccountController {
  constructor(private useCase: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body;

    const result = await this.useCase.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
