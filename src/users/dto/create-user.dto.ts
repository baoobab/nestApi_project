import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'Эл. почта'})
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({}, {message: "Некорректный Email"})
    readonly email: string;
    @ApiProperty({example: '1234ASDasd_', description: 'Пароль'})
    @IsString({message: 'Пароль должен быть строкой'})
    @Length(4, 16, {message: "Длина пароля должна быть от 4 до 16 символов"})
    readonly password: string;
    @ApiProperty({example: '5345d670-c2ee-4ba2-99a4-cfdadd93ac6b', description: 'Необязательная реф. ссылка того, кто пригласил пользователя'})
    @IsOptional()
    @IsString({message: 'inviteCode должен быть строкой'})
    readonly inviteCode?: string;
}