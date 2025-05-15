import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      content,
      imageUrl,
      author,
    };

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/manalo/posts`, payload)
      .then((response) => {
        alert('Post created successfully!');
        setContent('');
        setImageUrl('');
        setAuthor('');
        onPostCreated(response.data); // Notify parent component about the new post
      })
      .catch((err) => {
        console.error('Error creating post:', err);
        alert('Failed to create the post. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.formTitle}>Create a New Post</h2>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Title:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={styles.textarea}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" disabled={isSubmitting} style={styles.submitButton}>
        {isSubmitting ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '420px',
    margin: '0 auto', // Center the form horizontally
  },
  formTitle: {
    marginBottom: '20px',
    fontSize: '1.5em',
    color: '#343a40',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#495057',
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  textarea: {
    width: '100%',
    maxWidth: '400px',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto 0', // Center the button
  },
};

export default CreatePost;