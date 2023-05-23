import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
import * as dotenv from 'dotenv'; // Import dotenv package
import { Logger, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum, IServerConfig, ISwaggerConfig } from '@lib/types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config(); // Load environment variables from .env file

const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.setGlobalPrefix('api');
  const logger = new Logger('Bootstrap');
  const userService = app.get<UserService>(UserService);
  await userService.createAdmin();
  await userService.createAdminFake();
  await userService.mockData();

  const configService = app.get<ConfigService>(ConfigService);

  const { port: SERVER_PORT } = configService.get<IServerConfig>(ConfigEnum.SERVER);

  const swaggerConfig = configService.get<ISwaggerConfig>(ConfigEnum.SWAGGER);
  // swagger configuration
  const swaggerConfigDoc = new DocumentBuilder()

    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfigDoc);
  SwaggerModule.setup('api', app, swaggerDocument);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(SERVER_PORT);
  logger.log(`Server is running on: ${await app.getUrl()}`);
  await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
