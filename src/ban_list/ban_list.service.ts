import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ban_listModel } from "./ban_list.model";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class BanListService {

  constructor(@InjectModel(Ban_listModel) private banListRepository: typeof Ban_listModel) {}

  async BanUser(dto: BanUserDto) {
    const user = await this.banListRepository.create(dto)
    return user
  }
  async UnBanUser(banned_user_id: number) {
    const user = await this.banListRepository.destroy({where: {banned_user_id: banned_user_id}})
    if (!user || user == 0) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    return user
  }
  async getAll() {
    const users = await this.banListRepository.findAll()
    return users
  }

  async getUserById(id: number) {
    const user = await this.banListRepository.findOne({where: {banned_user_id: id}})
    if (user) {
      return user
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
  }
}
