const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({
      user_id: req.user.id,  
      title,
      content
    });
    res.status(201).json("post created successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) 
       return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if(post.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Post.delete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};