import { FC } from 'react';
import { useBookActions, useBooks } from '../hooks';
import { DIRECTION } from '../hooks/useSorting';
import { BookForm } from './BookForm';

export const BookList: FC = () => {
  const {
    books,
    loading,
    error,
    sortField,
    sortDirection,
    handleSort,
    canGoPrevious,
    canGoNext,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    totalPages,
    fetchBooks
  } = useBooks();

  const {
    editingBook,
    isCreating,
    actionError,
    handleDelete,
    handleEdit,
    handleCreate,
    handleFormClose,
    handleFormSubmit
  } = useBookActions(fetchBooks);

  return (
    <div className="book-list">
      <h1>Book List</h1>
      
      <div className="controls">
        <button onClick={handleCreate}>Add New Book</button>
        <div className="pagination">
          <button 
            onClick={goToPreviousPage}
            disabled={!canGoPrevious}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button 
            onClick={goToNextPage}
            disabled={!canGoNext}
          >
            Next
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : actionError ? (
        <p className="error">{actionError}</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortDirection === DIRECTION.ASC ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('isbn')}>
                ISBN {sortField === 'isbn' && (sortDirection === DIRECTION.ASC ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('author')}>
                Author {sortField === 'author' && (sortDirection === DIRECTION.ASC ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('releaseDate')}>
                Release Date {sortField === 'releaseDate' && (sortDirection === DIRECTION.ASC ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.isbn}</td>
                <td>{book.author}</td>
                <td>{new Date(book.releaseDate).toLocaleDateString()}</td>
                <td className='actions-cell'>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {(editingBook || isCreating) ? (
        <BookForm
          book={editingBook}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      ) : null}
    </div>
  );
};
