import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { CloudLoggingLogger } from './logging/logging.service';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: true,
            credentials: true,
        },
        logger: new CloudLoggingLogger(),
    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.use(cookieParser());

    const config = new DocumentBuilder().setTitle('real-home-data-backend').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(5000);
};

bootstrap();
