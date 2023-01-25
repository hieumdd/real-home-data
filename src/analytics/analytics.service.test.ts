import { Test, TestingModule } from '@nestjs/testing';

import { AnalyticsModule } from './analytics.module';
import { AnalyticsService } from './analytics.service';

jest.setTimeout(60_000);

describe('Analytics', () => {
    let moduleRef: TestingModule;
    let analyticsService: AnalyticsService;

    const dateOptions = {
        start: '2022-10-01',
        end: '2022-11-01',
    };

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [AnalyticsModule],
        }).compile();

        analyticsService = moduleRef.get(AnalyticsService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('dimension', () => {
        it.each(['dimension/city', 'dimension/county', 'dimension/postal-code'])(
            '%p',
            async (route) => {
                const res = await analyticsService.query(route);
                expect(res).toBeTruthy();
            },
        );
    });

    describe('location', () => {
        it.each([
            'location/inventory-by-type',
            'location/inventory',
            'location/major-metrics-condo-sales-volume',
            'location/major-metrics-current-inventory',
            'location/major-metrics-days-on-market',
            'location/major-metrics-days-to-market',
            'location/major-metrics-number-of-months-supply-of-home',
            'location/major-metrics-residential-sales-volume',
            'location/major-metrics-total-avg-sales-list-days-to-close',
            'location/median-average-house-price',
            'location/sales-price-vs-list-price-ratio',
        ])('%p', async (route) => {
            const res = await analyticsService.query(route, { ...dateOptions });
            expect(res).toBeTruthy();
        });
    });

    describe('supply-demand', () => {
        it.each([
            'supply-demand/absorbtion-rate',
            'supply-demand/new-listing-vs-under-contract',
            'supply-demand/closed-sales-vs-under-contract',
            'supply-demand/days-on-market',
        ])('%p', async (route) => {
            const res = await analyticsService.query(route, { ...dateOptions });
            expect(res).toBeTruthy();
        });
    });

    describe('supply-demand', () => {
        it.each(['price-reduction/price-reduction'])('%p', async (route) => {
            const res = await analyticsService.query(route, { ...dateOptions });
            expect(res).toBeTruthy();
        });
    });
});
