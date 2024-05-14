const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Part 1: Routes, Templates, and Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.post('/submit', (req, res) => {
  console.log('Form data:', req.body);
  res.send('Success');
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.render('user', { userId });
});

// Part 2: Middleware
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

// Part 3: Exploring Response Options
app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'example.jpg');
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
