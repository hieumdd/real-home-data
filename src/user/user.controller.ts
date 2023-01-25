import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }
}
