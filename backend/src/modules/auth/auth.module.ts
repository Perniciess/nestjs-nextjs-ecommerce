import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/common/config/jwt.config'
import { UsersModule } from 'src/modules/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'
import { JwtStrategy } from './jwt.strategy'
import { PasswordService } from './password.service'

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    exports: [PasswordService],
    providers: [AuthService, PasswordService, CookieService, JwtStrategy],
})
export class AuthModule {}
