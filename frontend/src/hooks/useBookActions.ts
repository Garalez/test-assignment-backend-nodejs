import { useCallback, useState } from 'react';
import { deleteBook } from '../api/bookApi';
import { Book } from '../types';

export const useBookActions = (onBooksChange: () => void) => {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDelete = useCallback(async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        onBooksChange();
        setActionError(null);
      } catch (err) {
        setActionError('Failed to delete book');
        console.error(err);
      }
    }
  }, [onBooksChange]);

  const handleEdit = useCallback((book: Book) => {
    setEditingBook(book);
    setIsCreating(false);
  }, []);

  const handleCreate = useCallback(() => {
    setEditingBook(null);
    setIsCreating(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setEditingBook(null);
    setIsCreating(false);
  }, []);

  const handleFormSubmit = useCallback(() => {
    onBooksChange();
    setEditingBook(null);
    setIsCreating(false);
  }, [onBooksChange]);

  return {
    editingBook,
    isCreating,
    actionError,
    handleDelete,
    handleEdit,
    handleCreate,
    handleFormClose,
    handleFormSubmit
  };
}; 
