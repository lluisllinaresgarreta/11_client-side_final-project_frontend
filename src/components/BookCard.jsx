import React, { useState } from 'react';
import styles from '../styles/BookCard.module.css';

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

    const getStatusClass = (status) => {
        switch (status) {
            case 'read': return styles['read'];
            case 'in progress': return styles['inProgress'];
            case 'pending': return styles['pending'];
            default: return '';
        }
    };

    const handleDelete = async () => {
        await fetch(`${API_URL}/books/${book.id}`, { method: 'DELETE' });
        refreshBooks();
    };

    return (
        <div className={styles['card_list']}>
            <div className={styles['card']}>
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
                    <h3 className={styles['title']}>
                        {book.title} 
                        <span className={styles['year']}>{book.year}</span>
                    </h3>
                    <p className={styles['author']}>{book.author}</p>
                    <hr className={styles.separator} />
                    <p>
                        <span className={getStatusClass(book.status)}>{book.status}</span>
                    </p>
                    <hr className={styles.separator} />
                    <button className={styles['edit']} onClick={() => setIsEditing(true)}>Edit</button>
                    <button className={styles['delete']} onClick={handleDelete}>Delete</button>
                </>
            )}
            </div>
        </div>
    );
}

export default BookCard;
