import React from 'react';
import PropTypes from 'prop-types';
import * as StrUtils from "../util/StringUtil.js"
import Loader from 'react-loader';

class Book extends React.Component {

    state = {
        loading: false
    }

    onBookMove(e) {
        var shelf = e.target.value;
        this.setState({loading: true});
        this.props.moveToShelf(this.props.book, shelf).then(() => {
            this.setState({loading: false});            
        });
    }

    render() {
        var book = this.props.book;
        var shelfs = this.props.shelfs;
        var shelfKeys = Object.keys(shelfs);
        return (
                <div className="book">
                    <div className="book-top">
                        <Loader loaded={!this.state.loading}>   
                            <div className="book-cover" style={{ width: "128px", height: "192px", backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                                <select onChange={(e) => this.onBookMove(e)} value={(book.shelf?book.shelf:'none')}>
                                    <option value="none" disabled>Move to...</option>
                                    {
                                        shelfKeys
                                            .map( shelf => {
                                                return (
                                                    <option key={shelf} value={shelf} { ...(shelf===book.shelf || (shelf==='none' && !book.shelf)) ? {"disabled": true} : {}}>{shelfs[shelf]}</option>                                        
                                                );                                      
                                            })
                                    }
                                </select>
                            </div>
                        </Loader>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors?StrUtils.strJoinAnd(book.authors):""}</div>                
                </div>

        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.object.isRequired,
    moveToShelf: PropTypes.func.isRequired
}

export default Book;