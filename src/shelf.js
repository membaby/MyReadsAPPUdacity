import React, { Component } from 'react'
import "./App.css"


class Shelf extends Component{
    render(){
        return (
            <div key={this.props.keys} className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.filter((book)=> (book.imageLinks)).map((book)=>
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={event => this.props.update(book.id, event)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors.join(', ')}</div>
                            </div>
                        </li>
                    )}
                </ol>
                </div>
            </div>
        )
    }
}

export default Shelf