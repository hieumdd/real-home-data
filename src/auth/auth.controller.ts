import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from '../user/user.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async signUp(@Body() authDto: AuthDto) {
        return this.authService.signUp(authDto).then((user) => ({
            user,
            token: this.authService.getJwt(user.id),
        }));
    }

    @Post('sign-in')
    async signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto).then((user) => ({
            user,
            token: this.authService.getJwt(user.id),
        }));
    }
}
