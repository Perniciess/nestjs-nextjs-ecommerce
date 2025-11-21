import type { IUser } from '@/shared/api/user/userTypes'

export interface IAuthResponse {
    accessToken: string
    user: IUser
}

export interface ISignInForm {
    email: string
    password: string
}

export interface ISignUpForm {
    email: string
    login: string
    password: string
}
