import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import "reflect-metadata";
import { DataSource, DataSourceOptions } from 'typeorm';

import { BookController } from './controllers/bookController';
import { mockBooks } from './mocks/bookMock';
import { Book } from './models/Book';
import { bookRouter } from './routes/bookRoutes';
import { BookService } from './services/bookService';

const app = new Koa();
const mainRouter = new Router();

const PORT = 3000;
const root = path.resolve(__dirname, "..")
const dbOptions: DataSourceOptions = {
  type: 'sqlite',
  database: `${root}/db.sqlite`,
  entities: [Book],
  synchronize: true,
}
const db = new DataSource(dbOptions);

const main = async () => {
  await db.initialize();
  console.log(`db - online`);

  const bookService = new BookService(db);
  const bookController = new BookController(bookService);

  const bookCount = await db.getRepository(Book).count();
  if (bookCount === 0) {
    await Promise.all(mockBooks.map(async (book) => {
      await bookService.createBook(book);
    }));
  }

  app.use(async (ctx, next) => {
    await next();
    ctx.response.get('X-Response-Time');
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    if (ctx.method === 'OPTIONS') {
      ctx.status = 204;
      return;
    }
    
    await next();
  });

  app.use(bodyParser());

  const booksRouter = bookRouter(bookController);
  
  mainRouter.get('/', async (ctx) => {
    ctx.body = {
      message: 'Bookstore API',
      endpoints: {
        books: '/books'
      }
    };
  });

  app.use(mainRouter.routes());
  app.use(booksRouter.routes());
  app.use(booksRouter.allowedMethods());

  app.listen(PORT);
  console.log(`app - online, port ${PORT}`);
};

main().then(() => console.log('all systems nominal')).catch(console.error)
