let { db } = require("../utils/dbAdmin");

exports.getBookList = (req, res) => {
    db.collection("books")
        .get()
        .then((data) => {
            let book_list = [];
            data.forEach((doc) => {
                book_list.push({
                    bookId: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    author: doc.data().author,
                });
            });
            return res.json(book_list);
        })
        .catch((err) => {
            res.status(500).json({
                error: err.code,
            });
        });
};

exports.getBookById = (req, res) => {
    let bookData = {};
    const doc = db.collection('books').doc(req.params.id);

    doc.get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: "Book not found",
                });
            }

            bookData = {
                bookId: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                author: doc.data().author,
            };

            return res.json(bookData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: err.code,
            });
        });
};

exports.createBook = (req, res) => {
    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    };

    db.collection("books")
        .add(newBook)
        .then((doc) => {
            let resBook = newBook;
            resBook.bookId = doc.id;
            return res.json(resBook);
        })
        .catch((err) => {
            res.status(500).json({
                error: "something went wrong",
            });
            console.error(err);
        });
};

exports.updateBook = (req, res) => {
    let updatedBook = {}
    const document = db.collection('books').doc(req.params.id);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: "Book not found",
                });
            }

            updatedBook = {
                bookId: doc.id,
                title: req.body.title ? req.body.title : doc.data().title,
                description: req.body.description ? req.body.description : doc.data().description,
                author: req.body.author ? req.body.author : doc.data().author,
            }

            document.update(updatedBook)
            return res.json(updatedBook);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                error: err.code,
            });
        });
};

exports.deleteBook = (req, res) => {
    const document = db.collection('books').doc(req.params.id)
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: "Book not found",
                });
            }
            return document.delete();
        })
        .then(() => {
            return res.json({
                message: "Book deleted successfully",
            });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                error: err.code,
            });
        });
};
