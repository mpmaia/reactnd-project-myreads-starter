import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import Book from "./Book.js";
import {debounce} from 'throttle-debounce';

class Search extends React.Component {

    state = {
        books: []
    }

    searchTerm(query) {
        this.props.search(query).then(r => {
            this.setState({books: r});
        });
    }

    debouncedSearch = debounce(300, this.searchTerm)

    render() {
        var booksOnShelf = this.props.booksOnShelf;        
        var books = this.state.books.map(book => {
            if(booksOnShelf) {
                var bookOnShelf = booksOnShelf.find((b) => b.id===book.id);
                if(bookOnShelf) {
                    return {...book, shelf: bookOnShelf.shelf};
                } 
            }
            return book;
        });            

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(e) => this.debouncedSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books && books.map( b => {
                                return (<Book key={b.id} book={b} shelfs={this.props.shelfs} moveToShelf={this.props.moveToShelf}/>)
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    shelfs: PropTypes.object.isRequired,
    booksOnShelf: PropTypes.array,
    moveToShelf: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
}

export default Search;