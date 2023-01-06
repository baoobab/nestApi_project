import { Body, Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { BanListService } from "./ban_list.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { User } from "../users/users.model";
import { Ban_listModel } from "./ban_list.model";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags('Бан Лист')
@Controller('ban-list')
export class BanListController {
  constructor(private banListService: BanListService) {}

  @ApiOperation({summary: 'Список всех забаненых пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllBannedUsers() {
    return this.banListService.getAll()
  }

  @ApiOperation({summary: 'Получить запись по конкретному пользователю'})
  @ApiResponse({status: 200, type: Ban_listModel})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/:id')
  getBannedUserById(@Param('id') id: number) {
    return this.banListService.getUserById(id || null)
  }
}
