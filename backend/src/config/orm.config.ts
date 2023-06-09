import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
// default directories
const ENTITIES_DIR = resolve(__dirname, '../', '**', 'entities', '*.entity.{ts,js}');

const MIGRATIONS_DIR = resolve(__dirname, '../', '**', 'migrations', '*.{ts,js}');
const ORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'zizle.cmohmyt3pz7h.eu-north-1.rds.amazonaws.com',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'zizle',
  // synchronize: true,
  entities: [ENTITIES_DIR],
  autoLoadEntities: true,
  migrations: [MIGRATIONS_DIR],
  // seeds: ['src/database/seeds/**/*{.ts,.js}'],
  // factories: ['src/database/factories/**/*{.ts,.js}'],
};
module.exports = ORMConfig;
