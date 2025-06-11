import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookForm from '../components/BookForm';

describe('BookForm', () => {
    it('renders input fields for title and author', () => {
        render(<BookForm refreshBooks={() => {}} />);
        expect(screen.getByPlaceholderText('Títol')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Autor')).toBeInTheDocument();
    });
});
