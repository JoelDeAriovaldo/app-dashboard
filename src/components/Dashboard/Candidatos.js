import React, { useState, useEffect } from 'react';
import { FaFilter, FaUserGraduate } from 'react-icons/fa';
import { fetchCandidates } from '../../services/api';
import { filterCandidates, sortCandidates } from '../../utils/helpers';
import './Candidatos.css';

const Candidatos = () => {
    const [candidates, setCandidates] = useState([]);
    const [filter, setFilter] = useState({ course: '', performance: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCandidates = async () => {
            try {
                const data = await fetchCandidates();
                setCandidates(data);
            } catch (err) {
                setError('Failed to fetch candidates.');
            }
        };
        loadCandidates();
    }, []);

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const filteredCandidates = filterCandidates(candidates, filter);

    return (
        <div className="candidatos-container">
            <h2>Manage Candidates</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="filter-container">
                <h3>Filters</h3>
                <input
                    type="text"
                    name="course"
                    placeholder="Filter by Course"
                    value={filter.course}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="performance"
                    placeholder="Top Performance %"
                    value={filter.performance}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="candidate-list">
                {filteredCandidates.map(candidate => (
                    <div key={candidate.id} className="candidate-item">
                        <h4>{candidate.name}</h4>
                        <p>Course: {candidate.course}</p>
                        <p>Performance: {candidate.performance}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Candidatos;