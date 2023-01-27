import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from '../user/user.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    async signUp(@Body() dto: AuthDto) {
        return this.authService
            .signUp(dto)
            .then((user) => ({ user, token: this.authService.getJwt(user.id) }));
    }

    @Post('sign-in')
    async signIn(@Body() dto: AuthDto) {
        return this.authService
            .signIn(dto)
            .then((user) => ({ user, token: this.authService.getJwt(user.id) }));
    }
}
