import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserDto {
    @IsString()
    @IsEmail()
    readonly email: string

    @IsString()
    readonly login: string

    @IsString()
    readonly password: string
}

export class CreateUserDto extends UserDto {
    @IsString()
    @IsNotEmpty()
    readonly salt: string
}

export class UpdateUserDto extends UserDto {
    @IsOptional()
    readonly email: string

    @IsOptional()
    readonly login: string

    @IsOptional()
    readonly password: string

    readonly salt: string
}
