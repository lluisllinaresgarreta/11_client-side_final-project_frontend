import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function BookCard({ book, refreshBooks }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        title: book.title,
        author: book.author,
        year: book.year,
        status: book.status
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async e => {
        e.preventDefault();
        await fetch(`${API_URL}/books/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
        });
        setIsEditing(false);
        refreshBooks();
    };

    const handleDelete = async () => {
        await fetch(`${API_URL}/books/${book.id}`, { method: 'DELETE' });
        refreshBooks();
    };

    return (
        <div className="book-card">
        {isEditing ? (
            <form onSubmit={handleUpdate}>
            <input name="title" value={form.title} onChange={handleChange} required />
            <input name="author" value={form.author} onChange={handleChange} required />
            <input name="year" value={form.year} onChange={handleChange} required />
            <select name="status" value={form.status} onChange={handleChange}>
                <option value="read">Llegit</option>
                <option value="in progress">En procés</option>
                <option value="pending">Pendent</option>
            </select>
            <button type="submit">Desa</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel·la</button>
            </form>
        ) : (
            <>
            <h3>{book.title}</h3>
            <p>{book.author} ({book.year})</p>
            <p>Estat: {book.status}</p>
            <button onClick={() => setIsEditing(true)}>Edita</button>
            <button onClick={handleDelete}>Elimina</button>
            </>
        )}
        </div>
    );
}

export default BookCard;
