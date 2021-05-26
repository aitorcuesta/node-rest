const { body, validationResult } = require('express-validator')
const Book = require('../model/book')

exports.findAll = function (req, res) {
    Book.find({}, 'title author')
        //.populate('author')        
        .exec(function (err, list_books) {
            if (err) { res.send(err) }            
            res.send(list_books);
        })
}

exports.findById = function (req, res) {
    Book.findById(req.params.id)
    .exec(function (err, list_books) {
        if (err) { res.send(err) }            
        res.send(list_books);
    })    
}

exports.create = [    
    // Validate and sanitise fields
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
    // The create function
    (req, res) => {        
        const errors = validationResult(req)        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        var book = new Book(
            {
                title: req.body.title,
                author: req.body.author,                
                isbn: req.body.isbn                
            });
        Book.create(book)
            .then(ok => res.send(ok))
            .catch(error => res.send(error))
    }

]

exports.delete = function (req, res) {
    Book.deleteOne({ _id:req.params.id})
    .then(deleted => res.send(deleted))
    .catch(err => res.send(err))
}

exports.update = [
    // Validate and sanitise fields
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
    // The create function
    (req, res) => {        
        const errors = validationResult(req)        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        Book.updateOne({ _id:req.params.id }, {
            title: req.body.title,
            author: req.body.author,                
            isbn: req.body.isbn
        })
        .exec(function (err, updated) {
            if (err) { 
                console.log(err)
                res.send(err)
            }            
            res.send(updated);
        })        
    }
] 