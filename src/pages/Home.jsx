import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import DeleteButton from '../components/DeleteButton';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/manalo/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/manalo/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the YapYap!</h1>
      <CreatePost onPostCreated={handlePostCreated} />
      <div style={styles.postsContainer}>
        {posts.map(post => (
          <div key={post.id} style={styles.postCard}>
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt={post.title || 'Post Image'} 
                style={styles.postImage}
              />
            )}
            <h2 style={styles.postContent}>{post.content}</h2>
            <p style={styles.postAuthor}><b>Author:</b> {post.author}</p>
            <p style={styles.date}><b>Uploaded:</b> {formatDate(post.createdAt)}</p>
            <p style={styles.date}><b>Last Updated:</b> {formatDate(post.updatedAt)}</p>
            <div style={styles.buttonGroup}>
              <button onClick={() => handleEdit(post.id)} style={styles.editButton}>Edit</button>
              <DeleteButton onDelete={() => handleDelete(post.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
    title: {
        textAlign: 'center',
        fontSize: '2em',
        color: '#000000',
        marginBottom: '20px',
    },

    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#B6B09F',
        minHeight: '100vh',
    },
    postsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        padding: '20px',
        gap: '25px',
    },
    postCard: {
        backgroundColor: '#F2F2F2',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '500px',
        overflow: 'hidden',
    },
    postImage: {
        width: '50%',
        height: '200px',
        objectFit: 'contain',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    postContent: {
        color: '#000000',
        marginBottom: '10px',
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
    },
    postAuthor: {
        color: '#495057',
        marginBottom: '10px',
        fontSize: '0.9em',
    },
    date: {
        fontSize: '0.8em',
        color: '#6c757d',
        marginBottom: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    editButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '10px 15px',
        backgroundColor: '#dc3545',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    };


export default Home;