const pool = require('../database');

const Comment = {
  create: async (postId, userId, content) => {
    const result = await pool.query('INSERT INTO Comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);
    return result.insertId;
  },
  findByPostId: async (postId) => {
    const [rows] = await pool.query('SELECT c.*, u.username FROM Comments c JOIN Users u ON c.user_id = u.id WHERE c.post_id = ?', [postId]);
    return rows;
  }
};

module.exports = Comment;
