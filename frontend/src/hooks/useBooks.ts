import { useCallback, useEffect, useState } from 'react';
import { getBooks } from '../api/bookApi';
import { Book } from '../types';
import { usePagination } from './usePagination';
import { useSorting } from './useSorting';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const pagination = usePagination();
  const sorting = useSorting();

  const { take, skip } = pagination.meta;
  const { setMeta } = pagination;
  const sortString = sorting.getSortString;
  
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBooks(take, skip, sortString);
      setBooks(response.data);
      setMeta(response.meta);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [take, skip, sortString, setMeta]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    fetchBooks,
    ...pagination,
    ...sorting
  };
}; 
