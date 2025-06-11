import React, { useEffect, useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const res = await fetch(`${API_URL}/books`);
        const data = await res.json();
        setBooks(data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="app">
        <h2>My Book Collection</h2>
        <BookForm refreshBooks={fetchBooks} />
        <BookList books={books} refreshBooks={fetchBooks} />
        </div>
    );
}

export default App;
