import { execSync } from 'node:child_process';
import { randomUUID } from 'crypto';
import 'dotenv/config';
import { PrismaClient } from 'generated/prisma';
import { config } from 'dotenv';

const prisma = new PrismaClient();

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }
  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const dbURL = generateUniqueDatabaseURL(schemaId);
  process.env.DATABASE_URL = dbURL;
  execSync('npx prisma db push');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
