import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() {}

    @Get()
    async root() {
        return { ok: 200 };
    }
}
