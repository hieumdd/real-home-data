import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';

jest.setTimeout(60_000);

describe('Auth', () => {
    let moduleRef: TestingModule;
    let authService: AuthService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [DatabaseModule, UserModule, AuthModule],
        }).compile();

        authService = moduleRef.get(AuthService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    describe('Auth', () => {
        it('Sign JWT', async () => {
            const userId = 1;
            const jwt = authService.getJwt(userId);
            console.log(jwt);
            return authService.getUserFromJwt(jwt).then((user) => {
                expect(user.id).toBe(1);
            });
        });
    });
});
