import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtGuard } from '../../auth/jwt.guard';
import { AnalyticsService } from '../analytics.service';
import { GenericFilterQuery, LevelFilterQuery } from '../analytics.dto';

const route = 'phase-2';

@ApiTags('Analytics / Phase 2')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller(route)
export class Phase2Controller {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(`closed-sales`)
    async closedSales(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/closed-sales`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`dollar-volume`)
    async dollarVolume(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/dollar-volume`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`new-listing`)
    async newListing(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/new-listing`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`pending-sales`)
    async pendingSales(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/pending-sales`, {
            ...genericFilter,
            ...levelFilter,
        });
    }
}
