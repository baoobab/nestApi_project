import { forwardRef, Module } from "@nestjs/common";
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Media } from "./media.model";
import { FilesModule } from "../files/files.module";

@Module({
  providers: [MediaService],
  controllers: [MediaController],
  imports: [
    SequelizeModule.forFeature([Media]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [MediaService]
})
export class MediaModule {}
