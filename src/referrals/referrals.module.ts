import { forwardRef, Module } from "@nestjs/common";
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ReferralsModel} from "./referrals.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ReferralsController],
  providers: [ReferralsService],
  imports: [
    SequelizeModule.forFeature([ReferralsModel]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [ReferralsService]
})
export class ReferralsModule {}
