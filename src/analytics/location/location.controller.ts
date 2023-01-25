import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtGuard } from '../../auth/jwt.guard';
import { AnalyticsService } from '../analytics.service';
import {
    GenericFilterQuery,
    LevelFilterQuery,
    ByOptionalFilterQuery,
} from '../analytics.dto';

const route = 'location';

@ApiTags('Analytics / Location')
@ApiBearerAuth()
// @UseGuards(JwtGuard)
@Controller(route)
export class LocationController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(`median-average-house-price`)
    async medianAverageHousePrice(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/median-average-house-price`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`sales-price-vs-list-price-ratio`)
    async salesPriceVsListPriceRatio(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/sales-price-vs-list-price-ratio`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`inventory-by-type`)
    async inventoryByType(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/inventory-by-type`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`major-metrics-total-avg-sales-list-days-to-close`)
    async majorMetricsTotalAvgSalesListDaysToClose(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(
            `${route}/major-metrics-total-avg-sales-list-days-to-close`,
            { ...genericFilter, ...levelFilter },
        );
    }

    @Get(`major-metrics-residential-sales-volume`)
    async majorMetricsResidentialSalesVolume(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/major-metrics-residential-sales-volume`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`major-metrics-condo-sales-volume`)
    async majorMetricsCondoSalesVolume(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/major-metrics-condo-sales-volume`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`major-metrics-days-to-market`)
    async majorMetricsDaysToMarket(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/major-metrics-days-to-market`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`major-metrics-current-inventory`)
    async majorMetricsCurrentInventory(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/major-metrics-current-inventory`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`major-metrics-days-on-market`)
    async majorMetricsDaysOnMarket(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/major-metrics-days-on-market`, {
            ...genericFilter,
            ...levelFilter,
        });
    }

    @Get(`major-metrics-number-of-months-supply-of-home`)
    async majorMetricsNumberOfMonthsSupplyOfHome(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
    ) {
        return this.analyticsService.query(
            `${route}/major-metrics-number-of-months-supply-of-home`,
            { ...genericFilter, ...levelFilter },
        );
    }

    @Get(`inventory`)
    async inventory(
        @Query() genericFilter: GenericFilterQuery,
        @Query() byFilter: ByOptionalFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/inventory`, {
            ...genericFilter,
            ...byFilter,
        });
    }
}
