const express = require("express");
const { borrowBook, returnBook } = require("../controllers/bookController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js")

const router = express.Router();

router.use(authMiddleware);

router.post('/:bookId/borrow', borrowBook);
router.post('/:bookId/return', returnBook);

module.exports = router;