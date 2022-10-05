import { Module } from '@nestjs/common';

import { BigQueryProvider } from './bigquery.service';

@Module({
    providers: [BigQueryProvider],
    exports: [BigQueryProvider],
})
export class GoogleCloudModule {}
