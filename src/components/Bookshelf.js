import React from 'react';
import PropTypes from "prop-types";
import Book from "./Book.js";

class Bookshelf extends React.Component {

    render() {
        return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        this.props.books && this.props.books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book book={book} shelfs={this.props.shelfs} moveToShelf={this.props.moveToShelf}/>
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        </div>);
    }
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.object.isRequired,
    moveToShelf: PropTypes.func.isRequired
}

export default Bookshelf;