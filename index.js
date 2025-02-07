const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// In-memory storage for books
let books = [];

// 🟢 Create a New Book (POST /books)
app.post('/books', (req, res) => {
  const { book_id, title, author, genre, year, copies } = req.body;

  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (books.some(book => book.book_id === book_id)) {
    return res.status(400).json({ error: "Book ID already exists" });
  }

  const newBook = { book_id, title, author, genre, year, copies };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 🔵 Retrieve All Books (GET /books)
app.get('/books', (req, res) => {
  res.json(books);
});

// 🟡 Retrieve a Specific Book by ID (GET /books/:id)
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.book_id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

// 🟠 Update Book Information (PUT /books/:id)
app.put('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.book_id === req.params.id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  
  res.json(books[bookIndex]);
});

// 🔴 Delete a Book (DELETE /books/:id)
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.book_id === req.params.id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);
  res.json({ message: "Book deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
