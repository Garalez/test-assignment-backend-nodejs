import { DataSource, FindOptionsOrder, Repository } from 'typeorm';
import { Book } from '../models/Book';
import { BookDTO, CreateBookDTO, PaginationParams, SortParams, UpdateBookDTO } from '../types';

export class BookService {
  private bookRepository: Repository<Book>;

  constructor(dataSource: DataSource) {
    this.bookRepository = dataSource.getRepository(Book);
  }

  async getAllBooks(params: PaginationParams & { sort?: string } = {}): Promise<{ books: BookDTO[], total: number }> {
    const { take = 10, skip = 0, sort } = params;
    
    let order: FindOptionsOrder<Book> = {};
    if (sort) {
      const sortParams = this.parseSortParams(sort);
      order = sortParams;
    }

    const [books, total] = await this.bookRepository.findAndCount({
      take,
      skip,
      order
    });

    return { 
      books, 
      total 
    };
  }

  async getBookById(id: number): Promise<BookDTO | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  async createBook(bookData: CreateBookDTO): Promise<BookDTO> {
    const book = this.bookRepository.create(bookData);
    return await this.bookRepository.save(book);
  }

  async updateBook(id: number, bookData: UpdateBookDTO): Promise<BookDTO | null> {
    const book = await this.bookRepository.findOneBy({ id });
    
    if (!book) {
      return null;
    }

    Object.assign(book, bookData);
    return await this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  private parseSortParams(sortString: string): SortParams {
    const sortParams: SortParams = {};
    
    sortString.split(',').forEach(param => {
      const [field, direction] = param.split(':');
      if (field && (direction === 'asc' || direction === 'desc')) {
        sortParams[field] = direction;
      }
    });
    
    return sortParams;
  }
} 
