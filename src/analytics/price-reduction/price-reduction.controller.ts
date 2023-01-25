import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';

import { JwtGuard } from '../../auth/jwt.guard';
import { ParseQueryArray } from '../query.pipe';
import { AnalyticsService } from '../analytics.service';
import { QueryLevelBy } from '../analytics.dto';

const route = 'price-reduction';

@ApiTags('Analytics / Price Reduction')
@ApiBearerAuth()
@ApiExtraModels(QueryLevelBy)
@UseGuards(JwtGuard)
@Controller(route)
export class PriceReductionController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('price-reduction')
    async priceReduction(@Query(ParseQueryArray) options: QueryLevelBy) {
        return this.analyticsService.query(`${route}/price-reduction`, options);
    }
}
