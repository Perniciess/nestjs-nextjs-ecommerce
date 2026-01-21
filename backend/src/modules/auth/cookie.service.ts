import { Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class CookieService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	setRefreshToken(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN,
			expires: expiresIn,
			secure: false,
			sameSite: 'lax', // 'lax' for subdomens
		})
	}

	removeRefreshToken(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN,
			expires: new Date(0),
			secure: false,
			sameSite: 'lax', // 'lax' for subdomens
		})
	}
}


