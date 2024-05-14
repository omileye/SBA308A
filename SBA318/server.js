// server.js
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
};

app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/posts', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const posts = JSON.parse(data);
    res.json(posts);
  });
});

app.post('/posts', (req, res) => {
  const newPost = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const posts = JSON.parse(data);
    posts.push(newPost);
    fs.writeFile('data.json', JSON.stringify(posts, null, 2), err => {
      if (err) throw err;
      res.json({ message: 'Post created successfully' });
    });
  });
});

app.put('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    let posts = JSON.parse(data);
    const index = posts.findIndex(post => post.id === postId);
    if (index !== -1) {
      posts[index] = updatedPost;
      fs.writeFile('data.json', JSON.stringify(posts, null, 2), err => {
        if (err) throw err;
        res.json({ message: 'Post updated successfully' });
      });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  });
});

// Similar routes for DELETE and PATCH...

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/viewPost/:id', (req, res) => {
  const postId = req.params.id;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const posts = JSON.parse(data);
    const post = posts.find(post => post.id === postId);
    res.render('viewPost', { post });
  });
});

// Similar routes for rendering create, edit views...

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
