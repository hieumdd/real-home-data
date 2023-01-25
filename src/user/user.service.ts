import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

import { User } from './user.entity';
import { AuthDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        readonly em: EntityManager,

        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
    ) {}

    async findOneByEmail(email: string) {
        return this.userRepository.findOne({ email });
    }

    findOne(id: number) {
        return this.userRepository.findOneOrFail({ id });
    }

    async create(dto: AuthDto) {
        const user = this.userRepository.create(dto);
        await this.userRepository.persistAndFlush(user);
        return user;
    }
}
