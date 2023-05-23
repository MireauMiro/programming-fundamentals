function getTotalBooksCount(books) {
  totalBooks = 0;
  for (let i = 0; i < books.length; i++) {
    totalBooks += 1;
  }
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  totalAccounts = 0;
  for (let i = 0; i < accounts.length; i++) {
    totalAccounts += 1;
  }
  return totalAccounts;
}

function getBooksBorrowedCount(books) {
  checkedOut = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (!books[i].borrows[j].returned) {
        checkedOut += 1;
      }
    }
  }
  return checkedOut;
}

function getMostCommonGenres(books) {
  const popularGenres = books.reduce ((genres, book) => {
    let existingGenre = genres.find((genre) => genre.name === book.genre);
    if (!existingGenre) {
      genres.push({ name: book.genre, count: 1});
    } else {
      existingGenre.count += 1;
    }
    return genres;
  }, []);

  return popularGenres.sort((genreA, genreB) => genreB.count - genreA.count).slice(0,5);
}

function getMostPopularBooks(books) {
  const popularBooks = [];
  books.forEach ((book) => {
    let existingPopularBook = popularBooks.find((bookTitle) => bookTitle.name === book.title);
    if (!existingPopularBook) {
      popularBooks.push({ name: book.title, count: book.borrows.length })
    }
  });
  if (popularBooks.length <= 5) {
    return popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  }
  return popularBooks.sort((bookA, bookB) => bookB.count - bookA.count).slice(0,5);
}



function getMostPopularAuthors(books, authors) {

  function calculateAuthorCheckOuts (books, author) {
    let totalCheckOuts = 0;
    books.forEach ((book) => {
      if (book.authorId === author.id) {
        totalCheckOuts += book.borrows.length;
      }
    })
    return totalCheckOuts;
  }

  const popularAuthors = [];

  authors.forEach ((author) => {
    let existingAuthor = popularAuthors.find((authorObj) => authorObj.name === `${author.name.first} ${author.name.last}`);
    if (!existingAuthor) {
      popularAuthors.push({ name: `${author.name.first} ${author.name.last}` , count: calculateAuthorCheckOuts(books, author) })
    }
  });

  if (popularAuthors.length <= 5) {
    return popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count);
  }
  return popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count).slice(0,5);

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
