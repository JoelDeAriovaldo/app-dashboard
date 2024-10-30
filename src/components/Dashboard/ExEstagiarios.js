import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUserGraduate } from 'react-icons/fa';
import { fetchExInterns, createExIntern, updateExIntern, deleteExIntern } from '../../services/api';
import './ExEstagiarios.css';

const ExEstagiarios = () => {
    const [exInterns, setExInterns] = useState([]);
    const [form, setForm] = useState({ name: '', feedback: '', networking: '' });
    const [error, setError] = useState('');
    const [editingInternId, setEditingInternId] = useState(null);

    useEffect(() => {
        const loadExInterns = async () => {
            try {
                const data = await fetchExInterns();
                setExInterns(data);
            } catch (err) {
                setError('Failed to fetch ex-interns.');
            }
        };
        loadExInterns();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingInternId) {
                await updateExIntern(editingInternId, form);
                setExInterns(exInterns.map(intern => (intern.id === editingInternId ? { ...intern, ...form } : intern)));
            } else {
                const newIntern = await createExIntern(form);
                setExInterns([...exInterns, newIntern]);
            }
            setForm({ name: '', feedback: '', networking: '' });
            setEditingInternId(null);
        } catch (err) {
            setError('Failed to save ex-intern.');
        }
    };

    const handleEdit = (intern) => {
        setForm(intern);
        setEditingInternId(intern.id);
    };

    const handleDelete = async (internId) => {
        try {
            await deleteExIntern(internId);
            setExInterns(exInterns.filter(intern => intern.id !== internId));
        } catch (err) {
            setError('Failed to delete ex-intern.');
        }
    };

    return (
        <div className="ex-estagiarios-container">
            <h2>Ex-Interns</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="intern-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="feedback"
                    placeholder="Feedback"
                    value={form.feedback}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="networking"
                    placeholder="Networking"
                    value={form.networking}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-button">
                    {editingInternId ? 'Update Ex-Intern' : 'Add Ex-Intern'}
                </button>
            </form>
            <div className="intern-list">
                {exInterns.map(intern => (
                    <div key={intern.id} className="intern-item">
                        <h4>{intern.name}</h4>
                        <p>Feedback: {intern.feedback}</p>
                        <p>Networking: {intern.networking}</p>
                        <button onClick={() => handleEdit(intern)} className="edit-button">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(intern.id)} className="delete-button">
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExEstagiarios;