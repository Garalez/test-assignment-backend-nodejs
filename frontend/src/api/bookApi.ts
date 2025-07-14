import axios from 'axios';
import { Book, BooksResponse, CreateBookDTO, UpdateBookDTO } from '../types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBooks = async (
  take: number = 10, 
  skip: number = 0, 
  sort?: string
): Promise<BooksResponse> => {
  const params = new URLSearchParams();
  params.append('take', take.toString());
  params.append('skip', skip.toString());
  
  if (sort) {
    params.append('sort', sort);
  }
  
  const response = await api.get(`/books?${params.toString()}`);
  return response.data;
};

export const getBookById = async (id: number): Promise<Book> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: CreateBookDTO): Promise<Book> => {
  const response = await api.post('/books', bookData);
  return response.data;
};

export const updateBook = async (id: number, bookData: UpdateBookDTO): Promise<Book> => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
}; 
