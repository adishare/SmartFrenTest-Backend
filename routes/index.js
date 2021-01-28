const router = require("express").Router();

const bookControllers = require("../controllers/bookControllers");

router.get("/books", bookControllers.getBookList);
router.get("/books/:id", bookControllers.getBookById);
router.post("/books", bookControllers.createBook);
router.put("/books/:id", bookControllers.updateBook);
router.delete("/books/:id", bookControllers.deleteBook);


module.exports = router;
