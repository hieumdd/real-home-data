import { Entity, Property, Unique } from '@mikro-orm/core';

import { Record } from '../common/entity';

@Entity()
export class User extends Record {
    @Property()
    @Unique()
    email: string;

    @Property({ hidden: true })
    password: string;
}
