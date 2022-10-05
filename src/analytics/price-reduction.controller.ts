import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';

import { JwtGuard } from '../auth/jwt.guard';
import { AnalyticsService } from './analytics.service';
import { QueryLevelBy } from './analytics.dto';

const route = 'price-reduction';

@ApiTags('Analytics / Price Reduction')
@ApiBearerAuth()
@ApiExtraModels(QueryLevelBy)
@UseGuards(JwtGuard)
@Controller(route)
export class PriceReductionController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('price-reduction')
    async priceReductionPriceReduction(@Query() options: QueryLevelBy) {
        return this.analyticsService.query(`${route}/price-reduction`, options);
    }
}
