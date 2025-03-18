import { IsEmail, IsNotEmpty, IsString } from 'class-validator'


export class getSessionDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly login: string

    readonly iat: number

    readonly exp: number
}
