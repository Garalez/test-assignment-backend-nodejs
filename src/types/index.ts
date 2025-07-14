export interface BookDTO {
  id: number;
  name: string;
  isbn: string;
  author: string;
  releaseDate: string | Date;
}

export type CreateBookDTO = Omit<BookDTO, 'id'>;

export type UpdateBookDTO = Partial<CreateBookDTO>;

export interface PaginationParams {
  take?: number;
  skip?: number;
}

export type SortParams = Record<string, 'asc' | 'desc'>;

export interface BookQueryParams extends PaginationParams {
  sort?: string;
} 
