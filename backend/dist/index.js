"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const functions = require("firebase-functions");
const app_module_1 = require("./src/app.module");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./src/modules/user/user.service");
const config_1 = require("@nestjs/config");
const src_1 = require("../backend/libs/types/src");
const swagger_1 = require("@nestjs/swagger");
dotenv.config();
const expressServer = express();
const createFunction = async (expressInstance) => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
    app.setGlobalPrefix('api');
    const logger = new common_1.Logger('Bootstrap');
    const userService = app.get(user_service_1.UserService);
    await userService.createAdmin();
    await userService.createAdminFake();
    await userService.mockData();
    const configService = app.get(config_1.ConfigService);
    const { port: SERVER_PORT } = configService.get(src_1.ConfigEnum.SERVER);
    const swaggerConfig = configService.get(src_1.ConfigEnum.SWAGGER);
    const swaggerConfigDoc = new swagger_1.DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addBearerAuth()
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfigDoc);
    swagger_1.SwaggerModule.setup('api', app, swaggerDocument);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    await app.listen(SERVER_PORT);
    logger.log(`Server is running on: ${await app.getUrl()}`);
    await app.init();
};
exports.api = functions.https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});
//# sourceMappingURL=index.js.map