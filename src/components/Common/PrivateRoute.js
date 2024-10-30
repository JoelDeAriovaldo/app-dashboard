import React from 'react';

const PrivateRoute = ({ element }) => {
    // Temporarily allow access to all routes
    return element;
};

export default PrivateRoute;