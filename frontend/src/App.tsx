import { FC } from 'react';
import './App.css';
import { BookList } from './components/BookList';

const App: FC = () =>  (
  <div className="app">
    <header className="app-header">
      <h1>Bookstore Management</h1>
    </header>
    <main className="app-content">
      <BookList />
    </main>
    <footer className="app-footer">
      <p>&copy; 2025 Vlad Galcev</p>
    </footer>
  </div>
);

export default App; 
