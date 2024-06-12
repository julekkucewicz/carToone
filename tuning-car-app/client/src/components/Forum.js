import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/forum/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3003/api/forum/posts', {
        title: newPostTitle,
        content: newPostContent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewPostTitle('');
      setNewPostContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3003/api/forum/comments', {
        postId: selectedPost.id,
        content: newCommentContent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewCommentContent('');
      fetchComments(selectedPost.id);
    } catch (error) {
      console.error('Error creating comment', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/forum/comments/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    fetchComments(post.id);
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3003/api/forum/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3003/api/forum/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComments(selectedPost.id);
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  return (
    <div className="forum-container">
      <h2>Forum</h2>
      {!selectedPost && (
        <>
          {isLoggedIn && (
            <form className="new-post-form" onSubmit={handlePostSubmit}>
              <h3>Create a new post</h3>
              <input
                type="text"
                placeholder="Title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
                className="post-title-input"
              />
              <textarea
                placeholder="Content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
                className="post-content-textarea"
              ></textarea>
              <button type="submit" className="post-submit-button">Post</button>
            </form>
          )}
          <h3>Posts</h3>
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <span><span className="username">{post.username}</span>: {post.title}</span>
                <span className="view-comments" onClick={() => handlePostClick(post)}>
                  ➡
                </span>
                {isLoggedIn && post.username === localStorage.getItem('username') && (
                  <button className="delete-button" onClick={() => handleDeletePost(post.id)}>🗑️</button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {selectedPost && (
        <div className="comments-section">
          <div className="post-detail">
            <p><span className="username">User</span>: {selectedPost.username}</p>
            <p><span className="username">Title</span>: {selectedPost.title}</p>
            <p>{selectedPost.content}</p>
            {isLoggedIn && selectedPost.username === localStorage.getItem('username') && (
              <button className="delete-button" onClick={() => handleDeletePost(selectedPost.id)}>🗑️</button>
            )}
          </div>
          <h3>Comments</h3>
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p><span className="username">{comment.username}</span>: {comment.content}</p>
                {isLoggedIn && comment.username === localStorage.getItem('username') && (
                  <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>🗑️</button>
                )}
              </li>
            ))}
          </ul>
          {isLoggedIn && (
            <form className="new-comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Add a comment"
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                required
                className="comment-content-textarea"
              ></textarea>
              <button type="submit" className="comment-submit-button">Add Comment</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Forum;
