import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaStar } from 'react-icons/fa';
import './ProcessoSeletivo.css';

const ProcessoSeletivo = () => {
    const [stages, setStages] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [form, setForm] = useState({ stage: '', date: '', score: '' });
    const [error, setError] = useState('');
    const [editingStageId, setEditingStageId] = useState(null);

    useEffect(() => {
        // Load initial data if needed
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (editingStageId) {
                // Update stage logic
                setStages(stages.map(stage => (stage.id === editingStageId ? { ...stage, ...form } : stage)));
            } else {
                // Create new stage logic
                const newStage = { id: Date.now(), ...form };
                setStages([...stages, newStage]);
            }
            setForm({ stage: '', date: '', score: '' });
            setEditingStageId(null);
        } catch (err) {
            setError('Failed to save stage.');
        }
    };

    const handleEdit = (stage) => {
        setForm(stage);
        setEditingStageId(stage.id);
    };

    const handleDelete = (stageId) => {
        try {
            setStages(stages.filter(stage => stage.id !== stageId));
        } catch (err) {
            setError('Failed to delete stage.');
        }
    };

    return (
        <div className="processo-seletivo-container">
            <h2>Selection Process</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="stage-form">
                <input
                    type="text"
                    name="stage"
                    placeholder="Stage Name"
                    value={form.stage}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Interview Date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="score"
                    placeholder="Score"
                    value={form.score}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-button">
                    {editingStageId ? 'Update Stage' : 'Add Stage'}
                </button>
            </form>
            <div className="stage-list">
                {stages.map(stage => (
                    <div key={stage.id} className="stage-item">
                        <h4>{stage.stage}</h4>
                        <p>Date: {stage.date}</p>
                        <p>Score: {stage.score}</p>
                        <button onClick={() => handleEdit(stage)} className="edit-button">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(stage.id)} className="delete-button">
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessoSeletivo;