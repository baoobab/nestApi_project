import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { BanListModule } from './ban_list/ban_list.module';
import { ReferralsModule } from './referrals/referrals.module';
import {User} from "./users/users.model";
import {Ban_listModel} from "./ban_list/ban_list.model";
import {ReferralsModel} from "./referrals/referrals.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { ProductsModule } from "./products/products.module";
import { Product } from "./products/products.model";
import { MediaModule } from './media/media.module';
import { Media } from "./media/media.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
    controllers: [],
    providers: [{
        provide: APP_GUARD,
        useClass: RolesGuard
    }],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Ban_listModel, ReferralsModel, Role, UserRoles, Product, Media],
            autoLoadModels: true
        }),
        UsersModule,
        BanListModule,
        ReferralsModule,
        RolesModule,
        AuthModule,
        ProductsModule,
        MediaModule,
        FilesModule
    ],

})
export class AppModule {}