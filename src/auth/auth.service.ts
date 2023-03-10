import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }
  async login(userDto: CreateUserDto) {
    const user = await this.checkUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const new_user = await this.userService.getUserByEmail(userDto.email)
    if (new_user) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {token: this.jwtService.sign(payload)}
  }

  private async checkUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    const checkPassword = await bcrypt.compare(userDto.password, user.password)
    if (user && checkPassword) {
      return user
    } else {
      throw new UnauthorizedException({message: 'Неверные данные для входа'})
    }
  }
}
