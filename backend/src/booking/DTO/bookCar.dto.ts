import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean, } from 'class-validator';
import { Transform, } from 'class-transformer';

export class CreateBookDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    vehicle_id: number;

    @IsString()
    @IsOptional()
    pickup: string;

    @IsString()
    @IsOptional()
    dropoff: string

    @IsString()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    endDate: string

    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true' || value === '1' || value === 'on';
        }
        return Boolean(value);
    })
    confirmed: boolean;
}