import { render, screen } from '@testing-library/react';
import BookCard from '../components/BookCard';

describe('BookCard', () => {
    it('renders the book year and status', () => {
    const book = { title: 'Sample', author: 'Author', year: '2023', status: 'pending' };
    render(<BookCard book={book} />);
    expect(screen.getByText(/Author\s*\(\s*2023\s*\)/)).toBeTruthy();
    expect(screen.getByText(/Estat:\s*pending/)).toBeTruthy();
});
});
