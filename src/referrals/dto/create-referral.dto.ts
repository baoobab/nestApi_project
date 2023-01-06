import { ApiProperty } from "@nestjs/swagger";

export class CreateReferralDto {
  @ApiProperty({example: '2', description: 'ID пользователя - пригласитель'})
  readonly parent_user_id: number;
  @ApiProperty({example: '5', description: 'ID пользователя - приглашённый'})
  readonly child_user_id: number;
}