import { Injectable } from '@nestjs/common';
import nunjucks from 'nunjucks';
import { BigQueryDate } from '@google-cloud/bigquery';
import { chain } from 'lodash';

import { BigQueryProvider } from '../google-cloud/bigquery.service';
import { QueryOptions } from './analytics.dto';

@Injectable()
export class AnalyticsService {
    private env: nunjucks.Environment;

    constructor(private bigqueryProvider: BigQueryProvider) {
        const loader = new nunjucks.FileSystemLoader(`${__dirname}/template`);
        this.env = new nunjucks.Environment(loader, { autoescape: false });
        this.env.addFilter('quote', (value) => `'${value}'`);
    }

    parseResult(value: any) {
        return value instanceof BigQueryDate ? value.value : value;
    }

    render(path: string, options: QueryOptions) {
        return this.env.render(`${path}.sql.j2`, options);
    }

    async query(path: string, options: QueryOptions = {}) {
        const sql = this.render(path, options);

        return this.bigqueryProvider
            .query<any>(sql)
            .then((rows) => rows.map((row) => chain(row).mapValues(this.parseResult).value()))
            .then((data) => ({ data }));
    }
}
