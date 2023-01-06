import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';
import { ReferralsModel } from "../referrals/referrals.model";
import { ReferralsService } from "../referrals/referrals.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {} // обозначаем модель, для работы с ней

    async createUser(dto: CreateUserDto) {
        const ref_link: string = uuidv4();
        if (dto.inviteCode) { // если пользователь зарегался по реф. ссылке
            const user = await this.userRepository.create({email: dto.email, password: dto.password, referral_link: ref_link})
            const parentUser = await this.userRepository.findOne({where: { referral_link: dto.inviteCode}})
            if (parentUser) {
                let ref = new ReferralsService(ReferralsModel)
                await ref.createReferral({parent_user_id: parentUser.id, child_user_id: user.id})
                // если реферал нашелся, добавляем запись в бд
            }
            return user
        }
        const user = await this.userRepository.create({...dto, referral_link: ref_link})
        return user

    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }
}
