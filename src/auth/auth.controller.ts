import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Логинизация'})
  @ApiResponse({status: 200, type: 'token-string'})
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: 'Регистрация'})
  @ApiResponse({status: 200, type: 'token-string'})
  @Post('/reg')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }
}
