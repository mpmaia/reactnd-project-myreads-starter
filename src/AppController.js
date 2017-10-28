import * as BooksAPI from './BooksAPI'

class AppController {

    getBooksOnTheShelf() {
        return BooksAPI.getAll();
    }

    getBooksGroupedByBookshelf() {
        let books = this.getBooksOnTheShelf();
        return books.then((b) => { 
            this.books = this.groupByShelf(b);
            return this.books;
        });
    }

    groupByShelf(books) {
        let groupedBooks = books.reduce((r, b) => {
            r[b.shelf] = r[b.shelf] || [];
            r[b.shelf].push(b);
            return r;
        }, {});
        return groupedBooks;
    }

    moveToShelf(book, shelf) {
        return BooksAPI.update(book, shelf).then( r => {
            return r;
        });
    }

    search(query) {
        return BooksAPI.search(query, 20).then( r => {
            return r;
        });
    }

    getShelfs() {
        return {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want to Read",
            "read": "Read",
            "none": "None"
        };
    }
}

export default AppController;