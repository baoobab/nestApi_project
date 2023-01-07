import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({example: 'MANAGER', description: 'Роль'})
  @IsString({message: "Значение должно быть строкой"})
  readonly value: string;
  @ApiProperty({example: '3', description: 'ID Пользователя'})
  @IsNumber({}, {message: "Значение должно быть числом"})
  readonly user_id: number;
}