import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto { // заглушка
    @ApiProperty({example: 'test@gmail.com', description: 'Эл. почта'})
    readonly email: string;
    @ApiProperty({example: '1234ASDasd_', description: 'Пароль'})
    readonly password: string;
    @ApiProperty({example: '5345d670-c2ee-4ba2-99a4-cfdadd93ac6b', description: 'Необязательная реф. ссылка того, кто пригласил пользователя'})
    readonly inviteCode?: string;
}