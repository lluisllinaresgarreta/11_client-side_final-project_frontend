import { render, screen } from '@testing-library/react';
import BookCard from '../components/BookCard';
import '@testing-library/jest-dom';

describe('BookCard', () => {
    const book = {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        year: 2023,
        status: 'read'
    };

    it('renders book title, author, year, and status', () => {
        render(<BookCard book={book} refreshBooks={vi.fn()} />);
        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('Test Author')).toBeInTheDocument();
        expect(screen.getByText('2023')).toBeInTheDocument();
        expect(screen.getByText('read')).toBeInTheDocument();
    });
});
