const express = require("express");
const bookCtrl = require("./book.ctrl");

const router = express.Router();

//Get All
router.get("/", bookCtrl.getAll);

//Get One
router.get("/:id", bookCtrl.getBook, bookCtrl.getById);

//Create One
router.post("/", bookCtrl.create);

//Patch One
router.patch("/:id", bookCtrl.getBook, bookCtrl.patch);

//Put One
router.put("/:id", bookCtrl.getBook, bookCtrl.update);

//Delete One
router.delete("/:id", bookCtrl.getBook, bookCtrl.delete);

module.exports = router;
