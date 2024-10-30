import React from 'react';

export const Label = ({ children, className, ...props }) => (
    <label className={`block text-gray-700 ${className}`} {...props}>
        {children}
    </label>
);