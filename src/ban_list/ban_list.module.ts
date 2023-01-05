import { Module } from '@nestjs/common';
import { BanListController } from './ban_list.controller';
import { BanListService } from './ban_list.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Ban_listModel} from "./ban_list.model";

@Module({
  controllers: [BanListController],
  providers: [BanListService],
  imports: [
    SequelizeModule.forFeature([Ban_listModel])
  ]
})
export class BanListModule {}
