import { Entity, Property } from '@mikro-orm/core';

import { Record } from '../common/entity';

@Entity()
export class User extends Record {
    @Property()
    email: string;

    @Property({ hidden: true })
    password: string;
}
