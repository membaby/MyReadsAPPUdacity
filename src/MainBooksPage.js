import React, { Component } from 'react'
import * as BooksAPI from "./BooksAPI"
import Shelf from "./shelf"
import "./App.css"

class MainBooksPage extends Component{
    state = {}

    updateShelf = (bookID, event) => {
        const book = this.props.curBooks.filter(book => book.id === bookID)[0]
        book.shelf = event.target.value
        BooksAPI.update(book, event.target.value).then(response => {
          this.setState({books: this.props.curBooks})
        })
      }
    
    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <a href='./search'>Search</a>
                </div>
                <Shelf
                    keys = "reading"
                    title = "Currently Reading"
                    books = {this.props.curBooks.filter(book => book.shelf === "currentlyReading")}
                    update = {this.updateShelf}
                />
                <Shelf
                    keys = "toRead"
                    title = "Want To Read"
                    books = {this.props.curBooks.filter(book => book.shelf === "wantToRead")}
                    update = {this.updateShelf}
                />
                <Shelf
                    keys = "read"
                    title = "Read"
                    books = {this.props.curBooks.filter(book => book.shelf === "read")}
                    update = {this.updateShelf}
                />
            </div>
        )
    }
}

export default MainBooksPage