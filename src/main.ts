import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as Queue from 'bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const serverAdapter = new ExpressAdapter();
  // serverAdapter.setBasePath('/admin/queues');
  // const queue = new Queue('mail-queue')
  // createBullBoard({
  //   queues: [
  //     new BullAdapter(queue),
  //   ],
  //   serverAdapter
  // });
  // app.use('/admin/queues', serverAdapter.getRouter());

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages:
      process.env.NODE_ENV === 'PRODUCTION' ? true : false
  }));

  await app.listen(3000);
}

bootstrap();
