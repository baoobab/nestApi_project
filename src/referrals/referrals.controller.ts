import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ReferralsService } from "./referrals.service";
import { CreateReferralDto } from "./dto/create-referral.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ReferralsModel } from "./referrals.model";

@ApiTags('Реферальная Система')
@Controller('referrals')
export class ReferralsController {

  constructor(private referralsService: ReferralsService) {} // обозначаем сервис, для работы с ним

  // далее описываем запросы

  @ApiOperation({summary: 'Создание реферала'})
  @ApiResponse({status: 200, type: ReferralsModel})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() referralDto: CreateReferralDto) {
    return this.referralsService.createReferral(referralDto)
  }

  @ApiOperation({summary: 'Получение реферала по ID пользователя-пригласителя (связь)'})
  @ApiResponse({status: 200, type: [ReferralsModel]})
  @Get('/byp/:id')
  getByParent(@Param('id') id: number) {
    return this.referralsService.getReferralByParent(id || null)
  }

  @ApiOperation({summary: 'Получение реферала по ID пользователя-приглашенного (связь)'})
  @ApiResponse({status: 200, type: [ReferralsModel]})
  @Get('/byc/:id')
  getByChild(@Param('id') id: number) {
    return this.referralsService.getReferralByChild(id || null)
  }

  @ApiOperation({summary: 'Получение всех рефералов'})
  @ApiResponse({status: 200, type: [ReferralsModel]})
  @Get()
  getAll() {
    return this.referralsService.getAll()
  }
}
