import { ZodValidationPipe } from '@/infra/http/pipe/zod-validation-pipe';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { ConflictException, Get, UsePipes } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';
import z from 'zod';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@Controller('accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body;

    const emailVerification = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailVerification) {
      throw new ConflictException('User with same e-mail address already exists');
    }

    const hash_password = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      },
    });
  }
}
