import React from 'react';
import {Route, Link} from "react-router-dom";
import NotificationSystem from 'react-notification-system';
import './App.css';
import AppController from "./AppController.js";
import Bookshelf from "./components/Bookshelf.js";
import Search from "./components/Search.js";

class BooksApp extends React.Component {

  state = {}

  constructor() {
    super();
    this.controller = new AppController();
  }

  componentDidMount() {
    this.updateBookshelf();
    this._notificationSystem = this.refs.notificationSystem;    
  }

  updateBookshelf() {
    return this.controller.getBooksOnTheShelf().then(books => {
      let groupedBooks = this.controller.groupByShelf(books);
      this.setState({books, groupedBooks});      
    }).catch((e)=> {
      console.log("Error updating shelf", e);
      this.showError("There was an error updating the book list.");  
    });
  }

  moveToShelf(book, shelf) {
    return this.controller.moveToShelf(book, shelf).then(() => {
      this.showSuccess(`The book "${book.title}" was moved to shelf "${this.controller.getShelfs()[shelf]}".`);
      return this.updateBookshelf();
    }).catch((e)=> {
      this.showError("There was an error moving the book.");      
      console.log("Error moving to shelf", e);
    });
  }

  showError(message) {
    this._notificationSystem.addNotification({
      message: message,
      autoDismiss: 5,
      level: 'error'
    });
  }

  showSuccess(message) {
    this._notificationSystem.addNotification({
      message: message,
      autoDismiss: 5,
      level: 'success'
    });
  }

  render() {
    let shelfs = this.controller.getShelfs();
    return (
      <div className="app">
        <NotificationSystem ref="notificationSystem" />
        
        <Route path='/search' render={(props) => (
          <Search shelfs={shelfs} booksOnShelf={this.state.books} moveToShelf={(b, s) => this.moveToShelf(b, s)} search={this.controller.search}/>                    
        )}/>

        <Route path='/' exact render={(props) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  this.state.books && Object.keys(this.state.groupedBooks).map((key) => {
                      return (<Bookshelf title={shelfs[key]} 
                                        key={key} 
                                        books={this.state.groupedBooks[key]} 
                                        shelfs={shelfs} 
                                        moveToShelf={(b, s) => this.moveToShelf(b, s)}/>)
                  })
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>                   
        )}/>
      </div>
    )
  }
}

export default BooksApp
