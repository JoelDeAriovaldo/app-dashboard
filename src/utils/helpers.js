export const validateDocuments = (documents) => {
    // Implement validation logic
    return documents.every(doc => doc.isValid);
};

export const filterCandidates = (candidates, criteria) => {
    // Implement filtering logic based on criteria
    return candidates.filter(candidate => {
        return Object.keys(criteria).every(key => candidate[key] === criteria[key]);
    });
};

export const sortCandidates = (candidates, key) => {
    // Implement sorting logic
    return candidates.sort((a, b) => a[key] > b[key] ? 1 : -1);
};