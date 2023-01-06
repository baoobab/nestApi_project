import { Module } from '@nestjs/common';
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ReferralsModel} from "./referrals.model";

@Module({
  controllers: [ReferralsController],
  providers: [ReferralsService],
  imports: [
    SequelizeModule.forFeature([ReferralsModel])
  ],
  exports: [ReferralsService]
})
export class ReferralsModule {}
