'use client'; // Mark this as a Client Component

import React from 'react';

const BackButton = () => {
    return (
        <button
            onClick={() => window.history.back()}
            style={{
                color: 'var(--red-primary)',
                marginBottom: '20px',
                display: 'flex',
                cursor: 'pointer',
            }}
        >
            <h3 style={{ marginRight: '10px' }}>←</h3>
            <h3 style={{ textDecoration: 'underline' }}>Zurück</h3>
        </button>
    );
};

export default BackButton;