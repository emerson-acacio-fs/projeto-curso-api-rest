module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.APP_DATABASE_PASSWORD,
  database: process.env.APP_DATABASE_POSTGRES,
  entities: ['./src/modules/***/typeorm/entities/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  cli: { migrationsDir: './src/shared/typeorm/migrations' },
};
