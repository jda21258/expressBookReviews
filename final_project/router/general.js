const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
//Register a new user
    const username = req.body.username;
    const password = req.body.password;
    //Check if both username and password are provided
    if (username && password) {
        //Check if the user does not already exist
        if (!isValid(username)) {
            //Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    //Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

//  Task 10 Update
// Get book lists
const getBooks = () => {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
};

//  Task 1
//  Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const bookList = await getBooks(); 
    res.json(bookList); // Neatly format JSON output
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book list" });
  }
});

// Task 11 Update
// Get book details based on ISBN
const getByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        let isbnNum = parseInt(isbn);
        if (books[isbnNum]) {
            resolve(books[isbnNum]);
        } else {
            reject({ status: 404, message: `ISBN ${isbn} not found` });
        }
    });
};

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN]);
 });
 
 // Updated Task 12
// Get book details based on author using promises or async-await
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    getBooks()
    .then((bookEntries) => Object.values(bookEntries))
    .then((books) => books.filter((book) => book.author === author))
    .then((filteredBooks) => res.send(filteredBooks));
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  res.send(books[author]);
});

// Updated Task 13
// Get book details based on title using promises or async-await
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    getBooks()
    .then((bookEntries) => Object.values(bookEntries))
    .then((books) => books.filter((book) => book.title === title))
    .then((filteredBooks) => res.send(filteredBooks));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  res.send(books[title]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.review;
  res.send(books[review]);
});

module.exports.general = public_users;
