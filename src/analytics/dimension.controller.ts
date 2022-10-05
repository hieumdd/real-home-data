import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtGuard } from '../auth/jwt.guard';
import { AnalyticsService } from './analytics.service';

const route = 'dimension';

@ApiTags('Analytics / Dimension')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller(route)
export class DimensionController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(`county`)
    async dimensionCounty() {
        return this.analyticsService.query(`${route}/county`);
    }

    @Get(`city`)
    async dimensionCity() {
        return this.analyticsService.query(`${route}/city`);
    }
}
