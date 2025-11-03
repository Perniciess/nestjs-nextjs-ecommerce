import { Module } from '@nestjs/common'
import { PasswordService } from '../auth/password.service'
import { UserController } from './users.controller'
import { UsersService } from './users.service'

@Module({
    providers: [UsersService, PasswordService],
    exports: [UsersService],
    controllers: [UserController],
})
export class UsersModule {}
