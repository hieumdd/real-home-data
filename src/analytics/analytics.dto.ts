import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GenericFilterQuery {
    @IsDateString()
    start: string;

    @IsDateString()
    end: string;

    @IsOptional()
    @IsString()
    @Type(() => String)
    @Transform(({ value }) => value.split(','))
    county?: string[];

    @IsOptional()
    @IsString()
    @Type(() => String)
    @Transform(({ value }) => value.split(','))
    city?: string[];

    @IsOptional()
    @IsString()
    @Type(() => String)
    @Transform(({ value }) => value.split(','))
    postal_code?: string[];
}

enum Level {
    'day',
    'week',
    'month',
}

export class LevelFilterQuery {
    @IsOptional()
    @IsEnum(Level)
    level?: Level;
}

enum By {
    'bedrooms_total',
    'type',
    'county',
}

export class ByFilterQuery {
    @IsEnum(By)
    by: By;
}

export class ByOptionalFilterQuery {
    @IsOptional()
    @IsEnum(By)
    by?: By;
}
