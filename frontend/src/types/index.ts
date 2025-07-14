export interface Book {
  id: number;
  name: string;
  isbn: string;
  author: string;
  releaseDate: string;
}

export type CreateBookDTO = Omit<Book, 'id'>;

export type UpdateBookDTO = Partial<CreateBookDTO>;

export interface PaginationMeta {
  total: number;
  take: number;
  skip: number;
}

export interface BooksResponse {
  data: Book[];
  meta: PaginationMeta;
} 
