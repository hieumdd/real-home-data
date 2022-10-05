import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnalyticsModule } from './analytics/analytics.module';

const routes = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'user',
        module: UserModule,
    },
    {
        path: 'analytics',
        module: AnalyticsModule,
    },
];

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        ...routes.map(({ module }) => module),
        RouterModule.register(routes),
    ],
})
export class AppModule {}
