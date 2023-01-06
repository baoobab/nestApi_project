import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ReferralsService } from "./referrals.service";
import { CreateReferralDto } from "./dto/create-referral.dto";
import { Request} from "express";

@Controller('referrals')
export class ReferralsController {

  constructor(private referralsService: ReferralsService) {} // обозначаем сервис, для работы с ним

  // далее описываем запросы

  @Post()
  create(@Body() referralDto: CreateReferralDto) {
    return this.referralsService.createReferral(referralDto)
  }

  @Get('/byp/:id')
  getByParent(@Req() request: Request) {
    return this.referralsService.getReferralByParent(Number(request.params.id) || null)
  }

  @Get('/byc/:id')
  getByChild(@Req() request: Request) {
    return this.referralsService.getReferralByChild(Number(request.params.id) || null)
  }

  @Get()
  getAll() {
    return this.referralsService.getAll()
  }
}
