import { render, screen } from '@testing-library/react';
import BookForm from '../components/BookForm';

describe('BookForm', () => {
  it('shows the "Add new book" button initially', () => {
    render(<BookForm refreshBooks={() => {}} />);
    expect(screen.getByText('Add new book')).toBeTruthy();
  });
});
