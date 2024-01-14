// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleAddPost = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleUpdatePost = async (postId, updatedPost) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="app">
      <h1 className='heading'>Blog Application</h1>
      <div className="add-post">
        <input className='title'
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <div>
        <textarea
          className='content'
          name="body"
          placeholder="Content"
          value={newPost.body}
          onChange={handleInputChange}
        />
        </div>
        <button className="post-button" onClick={handleAddPost}>Add Post</button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className=''>
            <button className="update" onClick={() => handleUpdatePost(post.id, { title: 'Updated Title' })}>
              Update
            </button>
            <button className="delete" onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
