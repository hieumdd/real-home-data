import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class BigQueryProvider {
    public client: BigQuery;

    constructor() {
        this.client = new BigQuery();
    }

    async query<T>(query: string): Promise<T[]> {
        return this.client.query(query).then(([rows]) => rows);
    }
}
