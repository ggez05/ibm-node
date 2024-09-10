const books = [
  {
    ISBN: "123456789",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  { ISBN: "987654321", title: "To Kill a Mockingbird", author: "Harper Lee" },
  { ISBN: "123123123", title: "1984", author: "George Orwell" },
  { ISBN: "321321321", title: "Pride and Prejudice", author: "Jane Austen" },
  {
    ISBN: "456456456",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
];

// function getAllBooks(callback) {
//   setTimeout(() => {
//     callback(null, books);
//   }, 1000);
// }

// // Usage of async callback function
// async function fetchBooks() {
//   return new Promise((resolve, reject) => {
//     getAllBooks((err, data) => {
//       if (err) {
//         return reject("Error fetching books");
//       }
//       resolve(data);
//     });
//   });
// }

// // Call the function to fetch books
// fetchBooks()
//   .then((books) => {
//     console.log("Books fetched:", books);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });

export function getAllBooks(req, res) {
  try {
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export function addBook(req, res) {
  try {
    const foundBook = books.find((book) => book.ISBN === req.body.ISBN);
    if (foundBook) {
      return res.json({ message: "Book Already Found!!" });
    }

    books.push(req.body);
    res.json({ message: "Book Added Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

// function findBookByISBN(ISBN) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const foundBook = books.find((book) => book.ISBN === ISBN);

//       if (foundBook) {
//         resolve(foundBook); // Resolve the Promise with the found book
//       } else {
//         reject("No book found with this ISBN"); // Reject the Promise if no book is found
//       }
//     }, 1000); // Simulating network latency with setTimeout
//   });
// }

// // Usage of the promise-based search function
// findBookByISBN("12345")
//   .then((book) => {
//     console.log("Book found:", book);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });

export function getBooksByISBN(req, res) {
  try {
    const { ISBN } = req.body;

    if (!ISBN) {
      return res.json({ message: "Please, provide a valid ISBN Code!" });
    }

    const foundBooks = books.filter((book) => book.ISBN === ISBN);
    if (foundBooks.length) {
      return res.json({ message: "Book Found!!", foundBooks });
    }

    res.json({ message: "No book found with this ISBN Code!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export function getBooksByTitle(req, res) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.json({ message: "Please, provide a valid title!" });
    }

    const foundBooks = books.filter((book) => book.title === title);
    if (foundBooks.length) {
      return res.json({ message: "Book Found!!", foundBooks });
    }

    res.json({ message: "No book found with this title!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export function getBooksByAuthor(req, res) {
  try {
    const { author } = req.body;

    if (!author) {
      return res.json({ message: "Please, provide a valid author name!" });
    }

    const foundBooks = books.filter((book) => book.author === author);
    if (foundBooks.length) {
      return res.json({ message: "Books are Found!!", foundBooks });
    }

    res.json({ message: "No book found with this author name!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}
