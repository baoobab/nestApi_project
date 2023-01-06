import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({example: '3', description: 'ID Пользователя'})
  readonly banned_user_id: number;
  @ApiProperty({example: 'Мошенничество', description: 'Причина бана'})
  readonly ban_reason: string;
}