import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/manalo/posts/${id}`)
      .then((response) => {
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.imageUrl);
        setAuthor(post.author);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        setError('Failed to load post data.');
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      imageUrl,
      author,
    };

    axios.put(`${import.meta.env.VITE_API_BASE_URL}/manalo/posts/${id}`, payload)
      .then(() => {
        alert('Post updated successfully!');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error updating post:', err);
        alert('Failed to update the post. Please try again.');
      });
  };

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <BackButton />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.formTitle}>Edit Post</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Content:</label>
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
            disabled
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Update Post
        </button>
      </form>
    </div>
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
    maxWidth: '500px',
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
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto 0', // Center the button
  },
};

export default EditPost;