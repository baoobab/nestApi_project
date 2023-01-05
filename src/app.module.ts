import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { BanListModule } from './ban_list/ban_list.module';
import { ReferralsModule } from './referrals/referrals.module';
import {User} from "./users/users.model";
import {Ban_listModel} from "./ban_list/ban_list.model";
import {ReferralsModel} from "./referrals/referrals.model";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Ban_listModel, ReferralsModel],
            autoLoadModels: true
        }),
        UsersModule,
        BanListModule,
        ReferralsModule,
    ],

})
export class AppModule {}