import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OK')
@Controller()
export class AppController {
    constructor() {}

    @Get()
    async root() {
        return { ok: 200 };
    }
}
