const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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
// const getBooks = () => {
    // return new Promise((resolve, reject) => {
        // resolve(books);
    // });
// };

//  Task 10
//  Get the book list available in the shop
public_users.get('/',async function (req, res) {
  try {
    const bookList = await getBooks(); 
    res.json(bookList); // Neatly format JSON output
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book list" });
  }
});

//  Update Task10
// Get book lists
const getBooks = () => {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
};


//  Task 2
//  Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
    // getByISBN(req.params.isbn)
    // .then(
        // result => res.send(result),
        // error => res.status(error.status).json({message: error.message})
    // );
 // });

//  Update Task 11
// Get book details based on ISBN
public_users.get('books/isbn/:isbn', function (req, res) {
    const get_books_isbn = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        //console.log(isbn);
            if(req.params.isbn <= 10) {
                resolve(res.send(books[isbn]));
        }
            else {
                reject(res.send('ISBN not found'));
            }
        });
        get_books_isbn.
            then(function(){
                console.log("Promise for Task 11 is resolve");
        }).
            catch(function () {
                console.log('ISBN not found');
        });
});

// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //const author = req.params.author;
    // getBooks()
    //.then((bookEntries) => Object.values(bookEntries))
    //.then((books) => books.filter((book) => book.author === author))
    //.then((filteredBooks) => res.send(filteredBooks));
    // const author = req.params.author;
    // res.send(books[author]);
//});

//Task 12 Update
public_users.get('/books/author/:author', function (req, res) {
    const get_books_author = new Promise((resolve, reject) => {
        let booksbyauthor = [];
        let isbns = Obejct.keys(books);
        isbns.forEach((isbn) => {
            if(books[isbn]["author"] === req.params.author) {
                booksbyauthor.push({"isbn":isbn, "title":books[isbn]["title"],"reviews":books[isbn]["reviews"]});
            resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
    }
});
reject(res.send("The stated author does not exist"))
    });
get_books_author.then(function(){
    console.log("Prmose is resolved");
}).catch(function () {
    console.log('The stated author does not exist');
});
});

//Task 13 Update
public_users.get('/books/title/:title', function (req, res) {
    const get_books_title = new Promise((resolve, reject) => {
        let booksbytitle = [];
        let isbns = Obejct.keys(books);
        isbns.forEach((isbn) => {
            if(books[isbn]["title"] === req.params.title) {
                booksbytitle.push({"isbn":isbn, "author":books[isbn]["author"],"reviews":books[isbn]["reviews"]});
            resolve(res.send(JSON.stringify({booksbytitle}, null, 4)));
    }
});
reject(res.send("The stated title does not exist"))
    });
get_books_title.then(function(){
    console.log("Promose is resolved");
}).catch(function () {
    console.log('The stated title does not exist');
});
});

// Get all books based on title
//public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //const title = req.params.title;
  //getBooks()
  //.then((bookEntries) => Object.values(bookEntries))
  //.then((books) => books.filter((book) => book.title === title))
  //.then((filteredBooks) => res.send(filteredBooks));
  // res.send(books[title]);
//});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.review;
  res.send(books[review]);
});

module.exports.general = public_users;
