const express = require("express");
const { borrowBook, returnBook } = require("../controllers/bookController.js");
const router = express.Router();

router.post('/:bookID/borrow', borrowBook);
router.post('/:bookID/return', returnBook);

module.exports = router;