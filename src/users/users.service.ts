import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) { // обозначаем модель, для работы с ней
    }

    async createUser(dto: CreateUserDto) {
        let ref_link: string = uuidv4();
        const user = await this.userRepository.create({...dto, referral_link: ref_link})
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }
}
