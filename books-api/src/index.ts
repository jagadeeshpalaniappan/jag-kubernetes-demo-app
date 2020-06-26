import express from "express";

const app = express();
const PORT = 8080;

const BOOKS = [
  { id: "b1", title: "Book1", authorId: "a1" },
  { id: "b2", title: "Book2", authorId: "a1" },
];

app.get("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;
  console.log("books-api:start", { id });
  res.json({ id, title: `Book${id}`, authorId: "a1" });
  console.log("books-api:success", { id });
});

app.get("/api/v1/books", (req, res) => {
  console.log("books-api:start");
  res.json(BOOKS);
  console.log("books-api:success");
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));
