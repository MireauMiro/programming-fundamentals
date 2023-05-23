function findAuthorById(authors, id) {
  let foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;
}

function findBookById(books, id) {
  let foundBook = books.find((book) => book.id === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let checkedIn = [];

  for (let i = 0; i < books.length; i++) {
    if (!books[i].borrows[0].returned) {
      checkedOut.push(books[i]);
    } else {
      checkedIn.push(books[i]);
    }
  }
  let combinedArrays = [ checkedOut, checkedIn ]
  return combinedArrays;
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const borrowers = borrows.map((borrow) =>  {
    const account = accounts.find((anAccount) => anAccount.id === borrow.id);
    return { ...account, returned: borrow.returned };
  });

  if (borrowers.length <= 10) {
    return borrowers;
  }
  return borrowers.slice(0, 10);
}  

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
