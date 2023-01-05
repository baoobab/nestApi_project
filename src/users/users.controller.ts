import {Body, Controller, Post, Get} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {} // обозначаем сервис, для работы с ним

    // далее описываем запросы

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }
}