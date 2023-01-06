import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto{
  @ApiProperty({example: 'MANAGER', description: 'Роль'})
  readonly value: string;
  @ApiProperty({example: 'Менеджер', description: 'Описание роли'})
  readonly description: string;
}