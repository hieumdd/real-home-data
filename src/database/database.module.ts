import { Module, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Options } from '@mikro-orm/core';

const configService = new ConfigService();

const MikroOrmConfig = (configService: ConfigService): Options => ({
    type: 'postgresql',
    dbName: configService.get('PG_DB'),
    user: configService.get('PG_USER'),
    password: configService.get('PG_PASSWORD'),
    host: configService.get('PG_HOST'),
    port: 5432,
    entities: [__dirname + '/../../**/*.entity.js'],
    entitiesTs: [__dirname + '/../../**/*.entity.ts'],
    allowGlobalContext: configService.get('NODE_ENV') !== 'production',
    findOneOrFailHandler: (id: string) => {
        return new NotFoundException();
    },
    migrations: {
        tableName: 'migrations',
        path: 'src/database/migrations',
        glob: '!(*.d).{js,ts}',
        snapshot: false,
        transactional: true,
        disableForeignKeys: false,
        allOrNothing: true,
        emit: 'ts',
    },
    seeder: {
        path: 'src/**/',
        pathTs: 'src/**/',
        glob: '*.seeder.{js,ts}',
    },
    schemaGenerator: {
        disableForeignKeys: false,
    },
    debug: configService.get('NODE_ENV') !== 'production',
});

@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot({ envFilePath: ['.env', '.env.production'] })],
            inject: [ConfigService],
            useFactory: MikroOrmConfig,
        }),
    ],
})
export class DatabaseModule {}

export default MikroOrmConfig(configService);
