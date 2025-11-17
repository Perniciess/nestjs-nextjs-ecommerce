import { IsNotEmpty, IsString } from 'class-validator'


export class ProductDto {
    @IsNotEmpty()
    @IsString()
    readonly product_id: string

    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    readonly price: number

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsString()
    readonly size: string

    @IsNotEmpty()
    @IsString()
    readonly color: string

    @IsNotEmpty()
    @IsString()
    readonly brand_id: string

    @IsNotEmpty()
    @IsString()
    readonly category_id: string

    @IsNotEmpty()
    readonly image: string
}
