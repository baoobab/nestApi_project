import { forwardRef, Module } from "@nestjs/common";
import { BanListController } from './ban_list.controller';
import { BanListService } from './ban_list.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Ban_listModel} from "./ban_list.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [BanListController],
  providers: [BanListService],
  imports: [
    SequelizeModule.forFeature([Ban_listModel]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [BanListService]
})
export class BanListModule {}
