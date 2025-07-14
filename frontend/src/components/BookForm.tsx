import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { createBook, updateBook } from '../api/bookApi';
import { Book, CreateBookDTO, UpdateBookDTO } from '../types';

interface BookFormProps {
  book: Book | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const BookForm: FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateBookDTO | UpdateBookDTO>({
    name: book?.name || '',
    isbn: book?.isbn || '',
    author: book?.author || '',
    releaseDate: book?.releaseDate ? new Date(book.releaseDate).toISOString().split('T')[0] : '',
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      if (book) {
        await updateBook(book.id, formData as UpdateBookDTO);
      } else {
        await createBook(formData as CreateBookDTO);
      }
      
      onSubmit();
    } catch (err) {
      setError(`Failed to ${book ? 'update' : 'create'} book`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-overlay">
      <div className="book-form">
        <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
        
        {error ? <p className="error">{error}</p> : null}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="isbn">ISBN:</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate as string}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : book ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
