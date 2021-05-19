import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(configService.get('GLOBAL_PREFIX'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Hubspot - API Documentation')
    .setDescription('Documentation')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(configService.get('SWAGGER_ENDPOINT'), app, document);
  const port = configService.get('PORT');
  await app.listen(port, '0.0.0.0', () => {
    console.log(`App running at ${port} port`);
  });
}
bootstrap();
