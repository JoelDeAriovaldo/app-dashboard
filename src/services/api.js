import axios from 'axios';

export const fetchJobs = async () => {
    const response = await axios.get('/api/jobs');
    return response.data;
};

export const createJob = async (jobData) => {
    const response = await axios.post('/api/jobs', jobData);
    return response.data;
};

export const updateJob = async (jobId, jobData) => {
    const response = await axios.put(`/api/jobs/${jobId}`, jobData);
    return response.data;
};

export const deleteJob = async (jobId) => {
    const response = await axios.delete(`/api/jobs/${jobId}`);
    return response.data;
};

export const fetchCandidates = async () => {
    const response = await axios.get('/api/candidates');
    return response.data;
};

export const createCandidate = async (candidateData) => {
    const response = await axios.post('/api/candidates', candidateData);
    return response.data;
};

export const updateCandidate = async (candidateId, candidateData) => {
    const response = await axios.put(`/api/candidates/${candidateId}`, candidateData);
    return response.data;
};

export const deleteCandidate = async (candidateId) => {
    const response = await axios.delete(`/api/candidates/${candidateId}`);
    return response.data;
};

// Add missing functions for ex-interns
export const fetchExInterns = async () => {
    const response = await axios.get('/api/ex-interns');
    return response.data;
};

export const createExIntern = async (internData) => {
    const response = await axios.post('/api/ex-interns', internData);
    return response.data;
};

export const updateExIntern = async (internId, internData) => {
    const response = await axios.put(`/api/ex-interns/${internId}`, internData);
    return response.data;
};

export const deleteExIntern = async (internId) => {
    const response = await axios.delete(`/api/ex-interns/${internId}`);
    return response.data;
};