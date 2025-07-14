import { Context } from 'koa';
import { BookService } from '../services/bookService';
import { CreateBookDTO, UpdateBookDTO } from '../types';

export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  getAllBooks = async (ctx: Context): Promise<void> => {
    try {
      const { take, skip, sort } = ctx.query;
      
      const takeParam = take ? parseInt(take as string, 10) : undefined;
      const skipParam = skip ? parseInt(skip as string, 10) : undefined;
      
      const { books, total } = await this.bookService.getAllBooks({
        take: takeParam,
        skip: skipParam,
        sort: sort as string
      });

      ctx.body = {
        data: books,
        meta: {
          total,
          take: takeParam || 10,
          skip: skipParam || 0
        }
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        error: 'Failed to retrieve books',
        details: error instanceof Error ? error.message : String(error)
      };
    }
  };

  getBookById = async (ctx: Context): Promise<void> => {
    try {
      const id = parseInt(ctx.params.id, 10);
      
      if (isNaN(id)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid book ID' };
        return;
      }

      const book = await this.bookService.getBookById(id);
      
      if (!book) {
        ctx.status = 404;
        ctx.body = { error: 'Book not found' };
        return;
      }
      
      ctx.body = book;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        error: 'Failed to retrieve book',
        details: error instanceof Error ? error.message : String(error)
      };
    }
  };

  createBook = async (ctx: Context): Promise<void> => {
    try {
      const bookData = ctx.request.body as unknown as CreateBookDTO;
      
      if (!bookData.name || !bookData.isbn || !bookData.author || !bookData.releaseDate) {
        ctx.status = 400;
        ctx.body = { error: 'Missing required fields' };
        return;
      }

      const newBook = await this.bookService.createBook(bookData);
      
      ctx.status = 201;
      ctx.body = newBook;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        error: 'Failed to create book',
        details: error instanceof Error ? error.message : String(error)
      };
    }
  };

  updateBook = async (ctx: Context): Promise<void> => {
    try {
      const id = parseInt(ctx.params.id, 10);
      
      if (isNaN(id)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid book ID' };
        return;
      }

      const bookData = ctx.request.body as unknown as UpdateBookDTO;
      
      if (Object.keys(bookData).length === 0) {
        ctx.status = 400;
        ctx.body = { error: 'No fields to update' };
        return;
      }

      const updatedBook = await this.bookService.updateBook(id, bookData);
      
      if (!updatedBook) {
        ctx.status = 404;
        ctx.body = { error: 'Book not found' };
        return;
      }
      
      ctx.body = updatedBook;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        error: 'Failed to update book',
        details: error instanceof Error ? error.message : String(error)
      };
    }
  };

  deleteBook = async (ctx: Context): Promise<void> => {
    try {
      const id = parseInt(ctx.params.id, 10);
      
      if (isNaN(id)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid book ID' };
        return;
      }

      const deleted = await this.bookService.deleteBook(id);
      
      if (!deleted) {
        ctx.status = 404;
        ctx.body = { error: 'Book not found' };
        return;
      }
      
      ctx.status = 204;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { 
        error: 'Failed to delete book',
        details: error instanceof Error ? error.message : String(error)
      };
    }
  };
} 
