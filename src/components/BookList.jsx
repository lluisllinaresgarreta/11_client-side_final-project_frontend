import React from 'react';
import BookCard from './BookCard';

function BookList({ books, refreshBooks }) {
    return (
        <div className="book-list">
        {books.map(book => (
            <BookCard key={book.id} book={book} refreshBooks={refreshBooks} />
        ))}
        </div>
    );
}

export default BookList;
