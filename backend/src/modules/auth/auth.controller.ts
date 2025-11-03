/* eslint-disable ts/consistent-type-imports */
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'
import { signInDto, signUpDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
    ) {}

    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() dto: signUpDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.signUp(dto)
        this.cookieService.setRefreshToken(res, refreshToken)
        return response
    }

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() dto: signInDto, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, ...response } = await this.authService.signIn(dto)
        this.cookieService.setRefreshToken(res, refreshToken)
        return response
    }

    @Post('sign-out')
    @HttpCode(HttpStatus.OK)
    signOut(@Res({ passthrough: true }) res: Response) {
        this.cookieService.removeRefreshToken(res)
        return true
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshTokenFromCookies = req.cookies[this.cookieService.REFRESH_TOKEN_NAME]

        if (!refreshTokenFromCookies) {
            this.cookieService.removeRefreshToken(res)
            throw new UnauthorizedException('Refresh token not passed')
        }

        const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies)

        this.cookieService.setRefreshToken(res, refreshToken)

        return response
    }
}
