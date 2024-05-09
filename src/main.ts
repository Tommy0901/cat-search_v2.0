import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 3000;

  app.use(require('cors')());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('pug');

  await app.listen(port, () => {
    console.info(`Service is active on http://localhost:${port}`);
  });
}
bootstrap();
