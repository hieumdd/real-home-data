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
    async locationMedianAverageHousePrice(
        @Query(ParseQueryArray) options: QueryLevel,
    ) {
        return this.analyticsService.query(
            `${route}/median-average-house-price`,
            options,
        );
    }

    @Get(`sales-price-vs-list-price-ratio`)
    async locationSalesPriceVsListPriceRatio(
        @Query(ParseQueryArray) options: QueryLevel,
    ) {
        return this.analyticsService.query(
            `${route}/sales-price-vs-list-price-ratio`,
            options,
        );
    }

    @Get(`inventory-by-type`)
    async locationInventoryByType(@Query(ParseQueryArray) options: QueryLevel) {
        return this.analyticsService.query(
            `${route}/inventory-by-type`,
            options,
        );
    }

    @Get(`major-metrics-total-avg-sales-list-days-to-close`)
    async locationMajorMetricsTotalAvgSalesListDaysToClose(
        @Query(ParseQueryArray) options: QueryGeneric,
    ) {
        return this.analyticsService.query(
            `${route}/major-metrics-total-avg-sales-list-days-to-close`,
            options,
        );
    }

    @Get(`major-metrics-residential-sales-volume`)
    async locationMajorMetricsResidentialSalesVolume(
        @Query(ParseQueryArray) options: QueryGeneric,
    ) {
        return this.analyticsService.query(
            `${route}/major-metrics-residential-sales-volume`,
            options,
        );
    }

    @Get(`major-metrics-condo-sales-volume`)
    async locationMajorMetricsCondoSalesVolume(
        @Query(ParseQueryArray) options: QueryGeneric,
    ) {
        return this.analyticsService.query(
            `${route}/major-metrics-condo-sales-volume`,
            options,
        );
    }

    @Get(`major-metrics-days-to-market`)
    async locationMajorMetricsDaysToMarket(
        @Query(ParseQueryArray) options: QueryGeneric,
    ) {
        return this.analyticsService.query(
            `${route}/major-metrics-days-to-market`,
            options,
        );
    }

    @Get(`major-metrics-current-inventory`)
    async locationMajorMetricsCurrentInventory(
        @Query(ParseQueryArray) options: QueryLevel,
    ) {
        return this.analyticsService.query(
            `${route}/major-metrics-current-inventory`,
            options,
        );
    }

    @Get(`inventory`)
    async locationInventory(@Query(ParseQueryArray) options: QueryBy) {
        return this.analyticsService.query(`${route}/inventory`, options);
    }
}
