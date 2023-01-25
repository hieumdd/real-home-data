import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtGuard } from '../../auth/jwt.guard';
import { AnalyticsService } from '../analytics.service';
import {
    GenericFilterQuery,
    LevelFilterQuery,
    ByFilterQuery,
    ByOptionalFilterQuery,
} from '../analytics.dto';

const route = 'supply-demand';

@ApiTags('Analytics / Supply Demand')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller(route)
export class SupplyDemandController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(`absorbtion-rate`)
    async absorbtionRate(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
        @Query() byFilter: ByFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/absorbtion-rate`, {
            ...genericFilter,
            ...levelFilter,
            ...byFilter,
        });
    }

    @Get(`closed-sales-vs-under-contract`)
    async closedSalesVsUnderContract(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
        @Query() byFilter: ByFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/closed-sales-vs-under-contract`, {
            ...genericFilter,
            ...levelFilter,
            ...byFilter,
        });
    }

    @Get(`new-listing-vs-under-contract`)
    async newListingVsUnderContract(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
        @Query() byFilter: ByFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/new-listing-vs-under-contract`, {
            ...genericFilter,
            ...levelFilter,
            ...byFilter,
        });
    }

    @Get(`days-on-market`)
    async daysOnMarket(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
        @Query() byFilter: ByOptionalFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/days-on-market`, {
            ...genericFilter,
            ...levelFilter,
            ...byFilter,
        });
    }
}
