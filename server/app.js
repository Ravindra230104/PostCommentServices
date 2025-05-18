require('dotenv').config(); 
const express = require('express');
const connection = require('./config/db'); 
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const cors = require('cors');
const {db, connectDb} = require('./config/db');


const app = express();

app.use(express.json()); 
app.use(cors()); 

connectDb();


app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
 

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});