import {
    HttpException,
    HttpStatus,
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthDto } from '../user/user.dto';
import { Token } from './token.interface';
import { UniqueConstraintViolationException } from '@mikro-orm/core';

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
        const payload = this.jwtService.verify<Token>(token, { ignoreExpiration });
        return this.userService.findOne(payload.id);
    }

    async signUp(authDto: AuthDto) {
        const hashedPassword = await bcrypt.hash(authDto.password, 10);

        return this.userService.create({ ...authDto, password: hashedPassword }).catch((err) => {
            if (err instanceof UniqueConstraintViolationException && err.code === '23505') {
                throw new ConflictException('email already exists');
            }

            throw new InternalServerErrorException();
        });
    }

    async signIn(authDto: AuthDto) {
        const user = await this.userService.findOneByEmail(authDto.email);
        await this.verifyPassword(authDto.password, user.password);
        return user;
    }

    async verifyPassword(plain: string, hashed: string) {
        const isPasswordMatching = await bcrypt.compare(plain, hashed);
        if (!isPasswordMatching) {
            throw new HttpException('wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
}
