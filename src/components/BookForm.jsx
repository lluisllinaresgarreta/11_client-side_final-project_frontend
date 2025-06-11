import React, { useState } from 'react';
import styles from '../styles/BookForm.module.css';

const API_URL = import.meta.env.VITE_API_URL;
//import styles from './BookForm.module.css';

function BookForm({ refreshBooks }) {
    const [form, setForm] = useState({ title: '', author: '', year: '', status: 'pending' });
    const [showForm, setShowForm] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
        });
        setForm({ title: '', author: '', year: '', status: 'pending' });
        setShowForm(false); // Amaga el formulari després d’afegir
        refreshBooks();
    };

    return (
        <div >
            {!showForm ? (
                <button className={styles['greenButton']} onClick={() => setShowForm(true)}>Add new book</button>
            ) : (
                <form className={styles['book-form-container']} onSubmit={handleSubmit}>
                    <button className={styles['greenButton']} onClick={() => setShowForm(false)}>Cancel</button>
                        <div className={styles['book-form']}>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                required
                            />
                            <input
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                required
                            />
                            <input
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                placeholder="Enter publication year"
                                required
                            />
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option value="read">read</option>
                                <option value="in progress">in progress</option>
                                <option value="pending">pending</option>
                            </select>
                        </div>
                        <div className={styles['greenButton-right']}>
                            <button className={styles['greenButton']} type="submit">Add Book</button>
                        </div>
                </form>
            )}
        </div>
    );
}

export default BookForm;
