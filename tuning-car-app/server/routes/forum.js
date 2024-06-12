const express = require('express');
const { Posts, Comments, Users } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });
    const post = await Posts.create({ user_id: user.id, title, content });
    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [{
        model: Users,
        as: 'user',
        attributes: ['username']
      }]
    });
    res.json(posts);
  } catch (error) {
    console.error('Fetch posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.delete('/posts/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id);
    const user = await Users.findOne({ where: { username: req.user.username } });
    if (post.user_id !== user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }
    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

router.post('/comments', authenticateToken, async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });
    const comment = await Comments.create({ post_id, user_id: user.id, content });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

router.get('/comments/:post_id', async (req, res) => {
  try {
    const comments = await Comments.findAll({
      where: { post_id: req.params.post_id },
      include: [{ model: Users, as: 'user', attributes: ['username'] }]
    });
    res.json(comments);
  } catch (error) {
    console.error('Fetch comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

router.delete('/comments/:id', authenticateToken, async (req, res) => {
  try {
    const comment = await Comments.findByPk(req.params.id);
    const user = await Users.findOne({ where: { username: req.user.username } });
    if (comment.user_id !== user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;
