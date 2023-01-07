import { Body, Controller, Post, Get, UseGuards, Param, Delete, UsePipes } from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
// import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "../ban_list/dto/ban-user.dto";
import { Ban_listModel } from "../ban_list/ban_list.model";
// import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {} // обозначаем сервис, для работы с ним

    // далее описываем запросы

    @ApiOperation({summary: 'Создание пользователя'}) // описываем запросы для API (для примера)
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение конкретного пользователя'})
    @ApiResponse({status: 200, type: User})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.usersService.getUserById(id || null)
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    // @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Выдача роли'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @ApiOperation({summary: 'Бан пользователя'})
    @ApiResponse({status: 200, type: Ban_listModel})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.usersService.banUser(dto)
    }

    @ApiOperation({summary: 'Разбан пользователя'})
    @ApiResponse({status: 200, type: 'Count of deleted rows (number)'})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/unban/:id')
    UnBanUser(@Param('id') id: number) {
        return this.usersService.UnBanUser(id || null)
    }
}
