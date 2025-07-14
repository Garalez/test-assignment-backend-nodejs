import Router from '@koa/router';
import { BookController } from '../controllers/bookController';

export const bookRouter = (bookController: BookController): Router => {
  const router = new Router({ prefix: '/books' });

  router.get('/', bookController.getAllBooks);
  router.get('/:id', bookController.getBookById);
  router.post('/', bookController.createBook);
  router.put('/:id', bookController.updateBook);
  router.delete('/:id', bookController.deleteBook);

  return router;
}; 
