import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'


export class signInDto {
    @IsEmail()
    @IsNotEmpty({
        message: 'Почта необходима для регистрации',
    })
    readonly email: string

    @IsNotEmpty({
        message: 'Пароль необходим',
    })
    @MinLength(6, {
        message: 'Пароль должен содержать не менее 6 символов',
    })
    readonly password: string
}

export class signUpDto extends signInDto {
    @IsNotEmpty({
        message: 'Логин необходим',
    })
    @IsString()
    readonly login: string
}
