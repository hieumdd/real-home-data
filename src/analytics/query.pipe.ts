import { PipeTransform, Injectable } from '@nestjs/common';
import { isString } from 'lodash';

type QueryArray = {
    county?: string | string[];
    city?: string | string[];
};

@Injectable()
export class ParseQueryArray<T extends QueryArray> implements PipeTransform {
    transform(value: T): T {
        const { county, city } = value;

        return {
            ...value,
            county: isString(county) ? [county] : value.county,
            city: isString(city) ? [city] : value.city,
        };
    }
}
