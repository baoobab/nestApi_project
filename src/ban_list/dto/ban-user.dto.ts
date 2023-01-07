import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
  @ApiProperty({example: '3', description: 'ID Пользователя'})
  @IsNumber({}, {message: "Значение должно быть числом"})
  readonly banned_user_id: number;
  @ApiProperty({example: 'Мошенничество', description: 'Причина бана'})
  @IsString({message: "Значение должно быть строкой"})
  readonly ban_reason: string;
}