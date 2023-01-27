import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

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

        describe('sign-up', () => {
            it('exists', async () => {
                const dto = {
                    email: 'hieumdd@gmail.com',
                    password: faker.internet.password(),
                };
                await expect(authService.signUp(dto)).rejects.toThrow(ConflictException);
            });

            it('new', async () => {
                const dto = {
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                };
                return authService.signUp(dto).then((user) => expect(user).toBeTruthy());
            });
        });
    });
});
