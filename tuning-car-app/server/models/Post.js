const pool = require('../database');

const Post = {
  create: async (userId, title, content) => {
    const result = await pool.query('INSERT INTO Posts (user_id, title, content) VALUES (?, ?, ?)', [userId, title, content]);
    return result.insertId;
  },
  findAll: async () => {
    const [rows] = await pool.query('SELECT p.*, u.username FROM Posts p JOIN Users u ON p.user_id = u.id');
    return rows;
  },
  findById: async (postId) => {
    const [rows] = await pool.query('SELECT p.*, u.username FROM Posts p JOIN Users u ON p.user_id = u.id WHERE p.id = ?', [postId]);
    return rows[0];
  }
};

module.exports = Post;
