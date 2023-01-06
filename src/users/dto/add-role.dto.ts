import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({example: 'MANAGER', description: 'Роль'})
  readonly value: string;
  @ApiProperty({example: '3', description: 'ID Пользователя'})
  readonly user_id: number;
}