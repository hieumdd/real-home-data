import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';

import { JwtGuard } from '../auth/jwt.guard';
import { AnalyticsService } from './analytics.service';
import { QueryLevelBy } from './analytics.dto';

const route = 'supply-demand';

@ApiTags('Analytics / Supply Demand')
@ApiBearerAuth()
@ApiExtraModels(QueryLevelBy)
@UseGuards(JwtGuard)
@Controller(route)
export class SupplyDemandController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(`absorbtion-rate`)
    async supplyDemandAbsorbtionRate(@Query() options: QueryLevelBy) {
        return this.analyticsService.query(`${route}/absorbtion-rate`, options);
    }

    @Get(`closed-sales-vs-under-contract`)
    async supplyDemandClosedSalesVsUnderContract(
        @Query() options: QueryLevelBy,
    ) {
        return this.analyticsService.query(
            `${route}/closed-sales-vs-under-contract`,
            options,
        );
    }

    @Get(`new-listing-vs-under-contract`)
    async supplyDemandNewListingVsUnderContract(
        @Query() options: QueryLevelBy,
    ) {
        return this.analyticsService.query(
            `${route}/new-listing-vs-under-contract`,
            options,
        );
    }

    @Get(`days-on-market`)
    async supplyDemandDaysOnMarket(@Query() options: QueryLevelBy) {
        return this.analyticsService.query(`${route}/days-on-market`, options);
    }
}
