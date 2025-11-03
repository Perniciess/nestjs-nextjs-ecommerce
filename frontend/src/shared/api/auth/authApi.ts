import { axiosClassic } from '@/shared/api/interceptors'
import { removeFromStorage, saveTokenStorage } from '@/shared/api/token-cookie'
import { LOGOUT_URL, REFRESH_TOKEN_URL, SIGNIN_URL, SIGNUP_URL } from './authConstants'
import { IAuthResponse, ISignInForm, ISignUpForm } from './authTypes'

class AuthService {
	async signUp(data: ISignUpForm) {
		const response = await axiosClassic.post<IAuthResponse>(SIGNUP_URL, data)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}

	async signIn(data: ISignInForm) {
		const response = await axiosClassic.post<IAuthResponse>(SIGNIN_URL, data)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		console.log(data)
		return response
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(LOGOUT_URL)

		if (response.data) removeFromStorage()

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(REFRESH_TOKEN_URL)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}
}

export const authService = new AuthService()
