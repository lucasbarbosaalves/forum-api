import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Prisma } from 'generated/prisma';
import request from 'supertest';

describe('Create account (e2e)', async () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  test('POST /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    });
    expect(response.status).toBe(201);

    const user = await prisma.user.findUnique({
      where: { email: 'john.doe@example.com' },
    });
    expect(user).toBeTruthy();
  });
});
