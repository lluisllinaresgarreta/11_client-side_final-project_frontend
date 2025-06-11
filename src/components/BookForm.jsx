import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function BookForm({ refreshBooks }) {
    const [form, setForm] = useState({ title: '', author: '', year: '', status: 'pending' });

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
        refreshBooks();
    };

    return (
        <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Títol" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Autor" required />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Any" required />
        <select name="status" value={form.status} onChange={handleChange}>
            <option value="read">read</option>
            <option value="in progress">in progress</option>
            <option value="pending">pending</option>
        </select>
        <button type="submit">Add</button>
        </form>
    );
}

export default BookForm;
