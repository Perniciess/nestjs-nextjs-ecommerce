import { IsNotEmpty, IsString } from 'class-validator'


export class CarouselDto {
    @IsNotEmpty()
    @IsString()
    readonly carousel_id: string

    @IsNotEmpty()
    @IsString()
    readonly product_id: string
}
