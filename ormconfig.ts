module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.APP_DATABASE_USERNAME,
  password: process.env.APP_DATABASE_PASSWORD,
  database: 'apivendas',
  entities: ['./src/modules/***/typeorm/entities/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  cli: { migrationsDir: './src/shared/typeorm/migrations' },
};
