import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtGuard } from '../../auth/jwt.guard';
import { AnalyticsService } from '../analytics.service';
import { GenericFilterQuery, LevelFilterQuery, ByOptionalFilterQuery } from '../analytics.dto';

const route = 'price-reduction';

@ApiTags('Analytics / Price Reduction')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller(route)
export class PriceReductionController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('price-reduction')
    async priceReduction(
        @Query() genericFilter: GenericFilterQuery,
        @Query() levelFilter: LevelFilterQuery,
        @Query() byFilter: ByOptionalFilterQuery,
    ) {
        return this.analyticsService.query(`${route}/price-reduction`, {
            ...genericFilter,
            ...levelFilter,
            ...byFilter,
        });
    }
}
