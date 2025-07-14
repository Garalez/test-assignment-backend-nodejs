# Bookstore Frontend

This is a simple React frontend to demonstrate the functionality of the Bookstore API backend. It provides a user interface to interact with all the backend features:

- View a list of books with pagination and sorting
- Add new books
- Edit existing books
- Delete books

## Getting Started

1. Make sure the backend API is running on `http://localhost:3000`
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
   This will run the frontend on [http://localhost:3001](http://localhost:3001), while the backend runs on port 3000.

## Features

- **Book List**: View all books with pagination
- **Sorting**: Click on column headers to sort by that field
- **Add Book**: Click "Add New Book" button to create a new book
- **Edit Book**: Click "Edit" button on a book row to modify its details
- **Delete Book**: Click "Delete" button on a book row to remove it from the database

## Technologies Used

- React
- TypeScript
- Axios for API requests
- CSS for styling 