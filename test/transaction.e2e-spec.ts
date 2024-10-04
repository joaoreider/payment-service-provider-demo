import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createTransactionExamples } from '../src/modules/transactions/test/examples/transaction-examples';
import { PrismaClient } from '@prisma/client';

describe('TransactionController (e2e) Test', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;

  // Setup the environment before running the tests
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaClient],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prismaClient = moduleFixture.get<PrismaClient>(PrismaClient);

    // this action will clean the database tables (Client, Transaction) before running the tests
    await prismaClient.$executeRaw`TRUNCATE "public"."Client" RESTART IDENTITY CASCADE;`;
    await prismaClient.$executeRaw`TRUNCATE "public"."Transaction" RESTART IDENTITY CASCADE;`;
    await prismaClient.client.create({
      data: {
        id: '048ab22e-6a84-40c2-bd41-f355c4748754',
        name: 'Client 1',
      },
    });
  });

  afterAll(async () => {
    await app.close();
    await prismaClient.$disconnect();
  }, 30000);

  it('Should create a new transaction - (POST) /transactions', async () => {
    const randomIdempotencyKey = Math.random().toString(36).substring(7);
    return request(app.getHttpServer())
      .post('/transactions')
      .set('x-idempotency-key', randomIdempotencyKey)
      .send(createTransactionExamples.valid)
      .expect(201);
  });

  it('Should not create a duplicate transaction - (POST) /transactions', async () => {
    const randomIdempotencyKey = Math.random().toString(36).substring(7);
    await request(app.getHttpServer())
      .post('/transactions')
      .set('x-idempotency-key', randomIdempotencyKey)
      .send(createTransactionExamples.valid)
      .expect(201);

    const response = request(app.getHttpServer())
      .post('/transactions')
      .set('x-idempotency-key', randomIdempotencyKey)
      .send(createTransactionExamples.valid)
      .expect(200);

    expect((await response).body).toEqual(randomIdempotencyKey);
  });
});
