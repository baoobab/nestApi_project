import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { ReferralsModel } from "./referrals.model";
import { CreateReferralDto } from "./dto/create-referral.dto";

@Injectable()
export class ReferralsService {

  constructor(@InjectModel(ReferralsModel) private referralRepository: typeof ReferralsModel) { // обозначаем модель, для работы с ней
  }

  async createReferral(dto: CreateReferralDto) {
    const referral = await this.referralRepository.create(dto)
    return referral
  }

  async getReferralByParent(req: number) {
    const referral = await this.referralRepository.findAll({where: { parent_user_id: req}})
    return referral
  }

  async getReferralByChild(req: number) {
    const referral = await this.referralRepository.findAll({where: { child_user_id: req}})
    return referral
  }

  async getAll() {
    const referrals = await this.referralRepository.findAll()
    return referrals
  }
}
