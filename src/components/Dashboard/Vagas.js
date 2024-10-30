import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import { fetchJobs, createJob, updateJob, deleteJob } from '../../services/api';
import './Vagas.css';

const Vagas = () => {
    const [jobs, setJobs] = useState([]);
    const [form, setForm] = useState({ title: '', department: '', status: '' });
    const [filter, setFilter] = useState({ department: '', status: '' });
    const [error, setError] = useState('');
    const [editingJobId, setEditingJobId] = useState(null);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await fetchJobs();
                setJobs(data);
            } catch (err) {
                setError('Failed to fetch jobs.');
            }
        };
        loadJobs();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingJobId) {
                await updateJob(editingJobId, form);
                setJobs(jobs.map(job => (job.id === editingJobId ? { ...job, ...form } : job)));
            } else {
                const newJob = await createJob(form);
                setJobs([...jobs, newJob]);
            }
            setForm({ title: '', department: '', status: '' });
            setEditingJobId(null);
        } catch (err) {
            setError('Failed to save job.');
        }
    };

    const handleEdit = (job) => {
        setForm(job);
        setEditingJobId(job.id);
    };

    const handleDelete = async (jobId) => {
        try {
            await deleteJob(jobId);
            setJobs(jobs.filter(job => job.id !== jobId));
        } catch (err) {
            setError('Failed to delete job.');
        }
    };

    const filteredJobs = jobs.filter(job => {
        return (
            (!filter.department || job.department === filter.department) &&
            (!filter.status || job.status === filter.status)
        );
    });

    return (
        <div className="vagas-container">
            <h2>Manage Jobs</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="job-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={form.status}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submit-button">
                    {editingJobId ? 'Update Job' : 'Add Job'}
                </button>
            </form>
            <div className="filter-container">
                <h3>Filters</h3>
                <input
                    type="text"
                    name="department"
                    placeholder="Filter by Department"
                    value={filter.department}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Filter by Status"
                    value={filter.status}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="job-list">
                {filteredJobs.map(job => (
                    <div key={job.id} className="job-item">
                        <h4>{job.title}</h4>
                        <p>Department: {job.department}</p>
                        <p>Status: {job.status}</p>
                        <button onClick={() => handleEdit(job)} className="edit-button">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(job.id)} className="delete-button">
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vagas;