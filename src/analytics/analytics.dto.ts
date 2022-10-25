enum Level {
    'day',
    'week',
    'month',
}

enum By {
    'bedrooms_total',
    'type',
    'county',
}

export class QueryGeneric {
    start: string;
    end: string;
    county?: string;
    city?: string;
}

export class QueryLevel extends QueryGeneric {
    level?: Level;
}

export class QueryBy extends QueryGeneric {
    by?: By;
}

export class QueryLevelBy extends QueryGeneric implements QueryLevel, QueryBy {
    level?: Level;
    by?: By;
}

export type QueryOptions =
    | QueryGeneric
    | QueryLevel
    | QueryBy
    | QueryLevelBy
    | {};
