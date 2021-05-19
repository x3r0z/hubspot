import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ThrottlerModule} from "@nestjs/throttler";
import {UserController} from './controllers/user.controller.controller';
import {InvoiceController} from './controllers/invoice.controller';
import {AuthController} from './controllers/auth.controller';
import {UserService} from './services/user.service';
import {InvoiceService} from './services/invoice.service';
import {AuthService} from './services/auth.service';
import {TypegooseModule} from "nestjs-typegoose";
import {UserModel} from "./models/user.model";
import {InvoiceModel} from "./models/invoice.model";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./strategy/local-strategy";
import {JwtStrategy} from "./strategy/jwt-strategy";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
        TypegooseModule.forFeature([UserModel, InvoiceModel]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: 'l0ip6bLulK4x2W1nPOmTAR8LqgktdA9YyQHPsUS0IYb2YragTn4rb3LJFG8O2dR',
                signOptions: {
                    expiresIn: Number(configService.get<string>('EXPIRATION_TIME')),
                },
                verifyOptions: {
                    ignoreExpiration: false,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [UserController, InvoiceController, AuthController],
    providers: [LocalStrategy, JwtStrategy, UserService, InvoiceService, AuthService],
})
export class AppModule {
}
