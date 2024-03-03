import { NestFactory } from '@nestjs/core';
import { AppModule } from './web-api/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Book Publisher')
    .setDescription('The book publisher documentation API description')
    .setVersion('1.0')
    .addTag('bookpublisher')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        description: 'Enter JWT token (without Bearer prefix)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cors());
  await app.listen(3000);
}

bootstrap();
