import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';

import { JwtGuard } from '../auth/jwt.guard';
import { ParseQueryArray } from './query.pipe';
import { AnalyticsService } from './analytics.service';
import { QueryGeneric, QueryLevel, QueryBy } from './analytics.dto';

const route = 'location';

@ApiTags('Analytics / Location')
@ApiBearerAuth()
@ApiExtraModels(QueryGeneric, QueryLevel, QueryBy)
@UseGuards(JwtGuard)
@Controller(route)
export class LocationController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(`median-average-house-price`)
    async medianAverageHousePrice(@Query(ParseQueryArray) options: QueryLevel) {
        return this.analyticsService.query(`${route}/median-average-house-price`, options);
    }

    @Get(`sales-price-vs-list-price-ratio`)
    async salesPriceVsListPriceRatio(@Query(ParseQueryArray) options: QueryLevel) {
        return this.analyticsService.query(`${route}/sales-price-vs-list-price-ratio`, options);
    }

    @Get(`inventory-by-type`)
    async inventoryByType(@Query(ParseQueryArray) options: QueryLevel) {
        return this.analyticsService.query(`${route}/inventory-by-type`, options);
    }

    @Get(`major-metrics-total-avg-sales-list-days-to-close`)
    async majorMetricsTotalAvgSalesListDaysToClose(@Query(ParseQueryArray) options: QueryGeneric) {
        return this.analyticsService.query(
            `${route}/major-metrics-total-avg-sales-list-days-to-close`,
            options,
        );
    }

    @Get(`major-metrics-residential-sales-volume`)
    async majorMetricsResidentialSalesVolume(@Query(ParseQueryArray) options: QueryGeneric) {
        return this.analyticsService.query(
            `${route}/major-metrics-residential-sales-volume`,
            options,
        );
    }

    @Get(`major-metrics-condo-sales-volume`)
    async majorMetricsCondoSalesVolume(@Query(ParseQueryArray) options: QueryGeneric) {
        return this.analyticsService.query(`${route}/major-metrics-condo-sales-volume`, options);
    }

    @Get(`major-metrics-days-to-market`)
    async majorMetricsDaysToMarket(@Query(ParseQueryArray) options: QueryGeneric) {
        return this.analyticsService.query(`${route}/major-metrics-days-to-market`, options);
    }

    @Get(`major-metrics-current-inventory`)
    async majorMetricsCurrentInventory(@Query(ParseQueryArray) options: QueryLevel) {
        return this.analyticsService.query(`${route}/major-metrics-current-inventory`, options);
    }

    @Get(`major-metrics-days-on-market`)
    async majorMetricsDaysOnMarket(@Query(ParseQueryArray) options: QueryGeneric) {
        return this.analyticsService.query(`${route}/major-metrics-days-on-market`, options);
    }

    @Get(`major-metrics-number-of-months-supply-of-home`)
    async majorMetricsNumberOfMonthsSupplyOfHome(@Query(ParseQueryArray) options: QueryGeneric) {
        return this.analyticsService.query(
            `${route}/major-metrics-number-of-months-supply-of-home`,
            options,
        );
    }

    @Get(`inventory`)
    async inventory(@Query(ParseQueryArray) options: QueryBy) {
        return this.analyticsService.query(`${route}/inventory`, options);
    }
}
