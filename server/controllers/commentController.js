const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;

    const postExists = await Post.findById(post_id);
    if(!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await Comment.create({
      post_id,
      user_id: req.user.id,
      content
    });
    res.status(201).json("comment added successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.getByPostId(req.params.post_id);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if(comment.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Comment.delete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};