import { Module } from '@nestjs/common';

import { GoogleCloudModule } from '../google-cloud/google-cloud.module';
import { AnalyticsService } from './analytics.service';
import { DimensionController } from './dimension/dimension.controller';
import { LocationController } from './location/location.controller';
import { SupplyDemandController } from './supply-demand/supply-demand.controller';
import { PriceReductionController } from './price-reduction/price-reduction.controller';

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
