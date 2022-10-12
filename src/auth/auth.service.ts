import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthDto } from '../user/user.dto';
import { Token } from './token.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    getJwt(id: number): string {
        return this.jwtService.sign(<Token>{ id });
    }

    getUserFromJwt(token: string, ignoreExpiration = false) {
        const payload = this.jwtService.verify<Token>(token, {
            ignoreExpiration,
        });
        return this.userService.findOne(payload.id);
    }

    async signUp(authDto: AuthDto) {
        const hashedPassword = await bcrypt.hash(authDto.password, 10);

        return this.userService
            .create({
                ...authDto,
                password: hashedPassword,
            })
            .catch((err) => {
                if (err?.code === 23505) {
                    throw new HttpException(
                        'User with that email already exists',
                        HttpStatus.BAD_REQUEST,
                    );
                }
                throw new HttpException(
                    'Something went wrong',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }

    async signIn(authDto: AuthDto) {
        try {
            const user = await this.userService.findOneByEmail(authDto.email);
            await this.verifyPassword(authDto.password, user.password);
            return user;
        } catch (error) {
            throw new HttpException(
                'Wrong credentials provided',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async verifyPassword(plain: string, hashed: string) {
        const isPasswordMatching = await bcrypt.compare(plain, hashed);
        if (!isPasswordMatching) {
            throw new HttpException(
                'Wrong credentials provided',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
