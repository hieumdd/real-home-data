import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GenericFilterQuery {
    @ApiProperty()
    @IsDateString()
    start: string;

    @ApiProperty()
    @IsDateString()
    end: string;

    @ApiPropertyOptional({ format: 'comma' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Type(() => String)
    @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
    county?: string[];

    @ApiPropertyOptional({ format: 'comma' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Type(() => String)
    @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
    city?: string[];

    @ApiPropertyOptional({ format: 'comma' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Type(() => String)
    @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
    postal_code?: string[];
}

enum Level {
    'day',
    'week',
    'month',
}

export class LevelFilterQuery {
    @ApiPropertyOptional({ enum: Level })
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
    @ApiProperty({ enum: By })
    @IsEnum(By)
    by: By;
}

export class ByOptionalFilterQuery {
    @ApiPropertyOptional({ enum: By })
    @IsOptional()
    @IsEnum(By)
    by?: By;
}
