import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ReferralsService } from "./referrals.service";
import { CreateReferralDto } from "./dto/create-referral.dto";

@Controller('referrals')
export class ReferralsController {

  constructor(private referralsService: ReferralsService) {} // обозначаем сервис, для работы с ним

  // далее описываем запросы

  @Post()
  create(@Body() referralDto: CreateReferralDto) {
    return this.referralsService.createReferral(referralDto)
  }

  @Get('/byp/:id')
  getByParent(@Param('id') id: number) {
    return this.referralsService.getReferralByParent(id || null)
  }

  @Get('/byc/:id')
  getByChild(@Param('id') id: number) {
    return this.referralsService.getReferralByChild(id || null)
  }

  @Get()
  getAll() {
    return this.referralsService.getAll()
  }
}
