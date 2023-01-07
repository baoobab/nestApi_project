import { NestFactory } from "@nestjs/core";
import {AppModule} from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import { RolesGuard } from "./auth/roles.guard";

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
      .setTitle('Test NestJS App')
      .setDescription('REST API Docs')
      .setVersion('1.0.0')
      .addTag('baoobab')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document) // документация
    // app.useGlobalGuards() // если нужно ограничить доступ для всего приложения
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`))
}

start()