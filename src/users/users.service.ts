import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';
import { ReferralsService } from "../referrals/referrals.service";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "../ban_list/dto/ban-user.dto";
import { BanListService } from "../ban_list/ban_list.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, // обозначаем модель, для работы с ней
                private roleService: RolesService,
                private referralService: ReferralsService,
                private banListService: BanListService) {}

    async createUser(dto: CreateUserDto) {
        const ref_link: string = uuidv4();
        const user = await this.userRepository.create({email: dto.email, password: dto.password, referral_link: ref_link})
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        if (dto.inviteCode) { // если пользователь зарегался по реф. ссылке
            const parentUser = await this.userRepository.findOne({where: { referral_link: dto.inviteCode}})
            if (parentUser) {
                await this.referralService.createReferral({parent_user_id: parentUser.id, child_user_id: user.id})
                // если реферал нашелся, добавляем запись в бд
            }
        }
        return user

    }

    async getUserById(id: number) {
        const user = await this.userRepository.findByPk(id, { include: {all: true}})
        if (user) {
            return user
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email: email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.user_id)
        const role = await this.roleService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.banned_user_id)
        if (user) {
            const ban = await this.banListService.BanUser(dto)
            const role = await this.roleService.getRoleByValue('BANNED')
            await user.$add('role', role.id)
            return ban
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    async UnBanUser(banned_user_id: number) {
        const user = await this.banListService.UnBanUser(banned_user_id)
        const db_user = await this.userRepository.findByPk(banned_user_id)
        if (user && db_user) {
            const role = await this.roleService.getRoleByValue('BANNED')
            await db_user.$remove('role', role.id)
        }
        return user
    }
}
