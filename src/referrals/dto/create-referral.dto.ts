import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateReferralDto {
  @ApiProperty({example: '2', description: 'ID пользователя - пригласитель'})
  @IsNumber({}, {message: "Значение должно быть числом"})
  readonly parent_user_id: number;
  @ApiProperty({example: '5', description: 'ID пользователя - приглашённый'})
  @IsNumber({}, {message: "Значение должно быть числом"})
  readonly child_user_id: number;
}