/* eslint-disable ts/consistent-type-imports */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './../users/dto/user.dto'
import { UsersService } from './../users/users.service'
import { signInDto, signUpDto } from './dto/auth.dto'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private passwordService: PasswordService,
        private jwtService: JwtService,
    ) {}

    async signUp(dto: signUpDto) {
        const user = await this.usersService.getByEmail(dto.email)
        if (user) {
            throw new BadRequestException({ type: 'Почта уже используется' })
        }

        const salt = this.passwordService.getSalt()
        const password = this.passwordService.getHash(dto.password, salt)

        const createUserDto: CreateUserDto = {
            email: dto.email,
            login: dto.login,
            password,
            salt,
        }
        const newUser = await this.usersService.createUser(createUserDto)

        return this.issueToken(newUser.id)
    }

    async signIn(dto: signInDto) {
        const user = await this.usersService.getByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException({ type: 'Пользователь не найден' })
        }

        const password = this.passwordService.getHash(dto.password, user.salt)
        if (password !== user.password) {
            throw new UnauthorizedException({ type: 'Wrong password' })
        }

        return this.issueToken(user.id)
    }

    private issueToken(userId: string) {
        const accessToken = this.jwtService.sign({
            id: userId,
            expiresIn: '1h',
        })

        const refreshToken = this.jwtService.sign({
            id: userId,
            expiresIn: '7d',
        })

        return { accessToken, refreshToken }
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwtService.verifyAsync(refreshToken)

        if (!result)
            throw new UnauthorizedException('Invalid refresh token')

        const { ...userResult } = await this.usersService.getById(result.id)

        if (!userResult) {
            throw new UnauthorizedException({ type: 'User not found' })
        }

        const { password, salt, ...user } = userResult

        const tokens = this.issueToken(user.id)

        return {
            user,
            ...tokens,
        }
    }
}
