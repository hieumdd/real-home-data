import { Test, TestingModule } from '@nestjs/testing';

import { AnalyticsModule } from './analytics.module';
import { AnalyticsService } from './analytics.service';
import { QueryOptions } from './analytics.dto';

jest.setTimeout(60_000);

const routes = [
    'dimension/city',
    'dimension/county',
    'location/median-average-house-price',
    'location/sales-price-vs-list-price-ratio',
    'location/inventory-by-type',
    'location/major-metrics-total-avg-sales-list-days-to-close',
    'location/major-metrics-residential-sales-volume',
    'location/major-metrics-condo-sales-volume',
    'location/major-metrics-days-to-market',
    'location/major-metrics-current-inventory',
    'location/inventory',
    'supply-demand/absorbtion-rate',
    'supply-demand/new-listing-vs-under-contract',
    'supply-demand/closed-sales-vs-under-contract',
    'supply-demand/days-on-market',
    'price-reduction/price-reduction',
];

const options: QueryOptions[] = [
    {
        start: '2022-07-01',
        end: '2022-08-01',
    },
    {
        level: 'day',
        start: '2022-07-01',
        end: '2022-08-01',
    },
    {
        by: 'bedrooms_total',
        start: '2022-07-01',
        end: '2022-08-01',
    },
    {
        level: 'week',
        by: 'bedrooms_total',
        start: '2022-07-01',
        end: '2022-08-01',
    },
];

const cases = routes.flatMap((route) =>
    options.map((option) => [route, option] as [string, QueryOptions]),
);

describe('Analytics', () => {
    let moduleRef: TestingModule;
    let analyticsService: AnalyticsService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AnalyticsModule],
        }).compile();

        analyticsService = moduleRef.get(AnalyticsService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    it.each(cases)('Query %p', async (route, option) => {
        console.log(route);
        return analyticsService.query(route, option).then((res) => {
            console.log(JSON.stringify(res.data.slice(5)));
            expect(res).toBeTruthy();
        });
    });
});
