import "reflect-metadata"
import Koa from 'koa';
import Router from '@koa/router';
import { Entity, PrimaryGeneratedColumn, Column, DataSourceOptions, DataSource } from 'typeorm';
import path from 'path';

const app = new Koa();
const router = new Router();

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  text!: string
}

const PORT = 3000;
const root = path.resolve(__dirname, "..")
const dbOptions: DataSourceOptions = {
  type: 'sqlite',
  database: `${root}/db.sqlite`,
  entities: [Message],
  // Automigrate tables from entities.
  synchronize: true,
  // logging: true
}
const db = new DataSource(dbOptions);

const main = async () => {
  await db.initialize();
  console.log(`db - online`);

  const message = new Message();
  message.text = 'sub bitches';
  await db.manager.save(message);
  console.log(`seeds - online`);

  router.get('/', async (ctx) => {
    const repository = db.getRepository(Message)
    const messages = await repository.find()
    ctx.body = messages;
  });

  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  app.use(router.routes());

  app.listen(PORT);
  console.log(`app - online, port ${PORT}`);
};

main().then(() => console.log('all systems nominal')).catch(console.error)
