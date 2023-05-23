function findAccountById(accounts, id) {
  let foundAccount = accounts.find((account) => account.id === id);
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (let i = 0; i < books.length; i++) { 
    const book = books[i];
    const borrowedBooks = book.borrows;
    for (let j = 0; j < borrowedBooks.length; j++) {
      const borrowed = borrowedBooks[j];
      if (borrowed.id === account.id) {
        totalBorrows += 1;
      }
    }
  }
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let possessedBooks = [];

  for (let book of books) {
    const bookAuthorID = book.authorId;
    const author = authors.find((author) => author.id === bookAuthorID);
  
    if (author) {
      const combinedBookAuthor = { ...book, author }
      const lastBorrower = book.borrows[0];
      if (lastBorrower.id === account.id && !lastBorrower.returned) {
        possessedBooks.push(combinedBookAuthor);
      }
    }
  }

  return possessedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
