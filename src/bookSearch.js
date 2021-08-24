import React, { Component } from 'react'
import * as BooksAPI from "./BooksAPI"
import "./App.css"


class BookSearch extends Component {
  state = {query: "", books: []}

  updateData = (books) => {
    const updated_books = books.map(book1 => {
      book1.shelf = "none" // Sets default shelf to None
      this.props.curBooks.forEach(book2 => {
        if (book1.id === book2.id) {
          book1.shelf = book2.shelf // Sets shelf of each book as of data retrieved from API.
          }  
      })
      return book1
    })
    this.setState({books: updated_books})
  }

  // Updates shelf of book when it is changed by user and saves to backend.
  updateBooks = (book, shelf)=> {
    const book_updating = this.state.books.filter(book1 => book1.id === book.id)[0]
    book_updating.shelf = shelf;
    this.setState({books: this.state.books})
    this.props.updateShelf(book, shelf);
  }

  // Refresh book list when textbox value is changed
  refresh = (q) => {
    this.setState({query: q});
    if (q) {
      BooksAPI.search(q).then((books) => {
        books.length > 0 ? this.updateData(books):this.setState({books:[]})
      }).catch((e)=> {
      console.error(`* API ERROR: ${e}`)})
    } else {
    this.setState({books:[]})}
  }
    
  render(){
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" 
              value={this.state.query} onChange={event => this.refresh(event.target.value)}/>

            </div>
          </div>
          
          <div className="search-books-results">
          <a href='./'>Main Page</a>
            <ol className="books-grid">
            {this.state.books.filter((book)=> (book.imageLinks)).map((book)=>
              <li key={book.id}>
                  <div className="book">
                      <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                      <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={event => this.updateBooks(book, event.target.value)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                          </select>
                      </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                  </div>
              </li>
            )}
            </ol>
          </div>
        </div>
      )
    }
}

export default BookSearch