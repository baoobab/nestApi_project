import { forwardRef, Module } from "@nestjs/common";
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Product } from "./products.model";
import { MediaModule } from "../media/media.module";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([Product]),
    RolesModule,
    MediaModule,
    forwardRef(() => AuthModule)
  ],
})
export class ProductsModule {}
