import React, { useState } from 'react';

const DeleteButton = ({ onDelete }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirming(true); // Show the confirmation dialog
  };

  const handleConfirm = () => {
    setIsConfirming(false); // Hide the confirmation dialog
    onDelete(); // Call the delete action passed from the parent
  };

  const handleCancel = () => {
    setIsConfirming(false); // Hide the confirmation dialog
  };

  return (
    <div style={styles.container}>
      {isConfirming ? (
        <div style={styles.confirmationBox}>
          <p style={styles.confirmationText}>Are you sure you want to delete this?</p>
          <button onClick={handleConfirm} style={styles.confirmButton}>Yes</button>
          <button onClick={handleCancel} style={styles.cancelButton}>No</button>
        </div>
      ) : (
        <button onClick={handleDeleteClick} style={styles.deleteButton}>Delete</button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'inline-block',
  },
  deleteButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  confirmationBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  confirmationText: {
    margin: 0,
    color: '#333',
  },
  confirmButton: {
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '5px 10px',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DeleteButton;