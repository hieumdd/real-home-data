import { Migration } from '@mikro-orm/migrations';

export class Migration20230127125518 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "deleted_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "email" varchar(255) not null, "password" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
