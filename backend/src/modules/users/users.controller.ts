/* eslint-disable ts/consistent-type-imports */
import { Body, Controller, Delete, Get, Param, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/common/decorators/auth.decorator'
import { CurrentUser } from 'src/common/decorators/user.decorator'
import { UpdateUserDto } from './dto/user.dto'
import { UsersService } from './users.service'

@Controller('/users')
export class UserController {
    constructor(private usersService: UsersService) {}

    @Get('/all')
    async getAllUsers() {
        return this.usersService.getAllUsers()
    }

    @Get('/:email')
    async findByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email)
    }

    @Get()
    @Auth()
    async getProfile(@CurrentUser('id') id: string) {
        return this.usersService.getProfile(id)
    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id)
    }

    @UsePipes(new ValidationPipe())
    @Put()
    @Auth()
    async updateUser(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(id, dto)
    }
}
