import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class VehicleDto {
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    engine: number;

    @IsString()
    @IsNotEmpty()
    fuel: string

    @IsNotEmpty()
    year: number;

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true' || value === '1' || value === 'on';
        }
        return Boolean(value);
    })
    transmission: boolean;


    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true' || value === '1' || value === 'on';
        }
        return Boolean(value);
    })
    available: boolean;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    // @IsArray()
    // images: []
}