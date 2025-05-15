import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')} // Navigate to the home page
      style={{
        marginBottom: '20px',
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      Back to Home
    </button>
  );
};

export default BackButton;