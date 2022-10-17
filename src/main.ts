import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AppModule from 'http/module/app.module';
import mongoose from 'mongoose';
import * as morgan from 'morgan';

mongoose.connect('mongodb://127.0.0.1:27017');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  //const app1 = await NestFactory.create(AppModule);
  //const app2 = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Форум DDD')
    .setDescription('API форума')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, options);

  app.use(morgan('dev'));

  await app.listen(3000);
  //await app1.listen(3001);
  //await app2.listen(3002);
}
bootstrap();
