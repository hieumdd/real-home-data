import { Module } from '@nestjs/common';

import { GoogleCloudModule } from '../google-cloud/google-cloud.module';
import { AnalyticsService } from './analytics.service';
import { DimensionController } from './dimension.controller';
import { LocationController } from './location.controller';
import { SupplyDemandController } from './supply-demand.controller';
import { PriceReductionController } from './price-reduction.controller';

@Module({
    imports: [GoogleCloudModule],
    providers: [AnalyticsService],
    controllers: [
        DimensionController,
        LocationController,
        SupplyDemandController,
        PriceReductionController,
    ],
})
export class AnalyticsModule {}
