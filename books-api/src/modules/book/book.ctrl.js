const Book = require("./book.model");

const bookCtrl = {};

// getBook middleware
bookCtrl.getBook = async (req, res, next) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Cannot find Book" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
};

bookCtrl.getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

bookCtrl.getById = (req, res) => {
  res.json(res.book);
};

bookCtrl.create = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    authorId: req.body.authorId,
  });
  try {
    const newBook = await book.save();
    res.status(201).json({ newBook });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

bookCtrl.patch = async (req, res) => {
  if (req.body.title) {
    res.book.title = req.body.title;
  }
  if (req.body.authorId) {
    res.book.authorId = req.body.authorId;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

bookCtrl.update = async (req, res) => {
  try {
    const updatedBook = await res.book.set(req.body);
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

bookCtrl.delete = async (req, res) => {
  try {
    await res.book.deleteOne();
    res.json({ message: "Book has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

bookCtrl.getById = (req, res) => {
  res.json(res.book);
};

module.exports = bookCtrl;
