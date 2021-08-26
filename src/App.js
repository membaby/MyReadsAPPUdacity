import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import MainBooksPage from "./MainBooksPage"
import BookSearch from "./bookSearch"

class BooksApp extends React.Component {
  state = {all_books: [], showSearchPage: false}

  // API calls for retrieving books data and updating shelves.
  updateData = () => {BooksAPI.getAll().then(data => {this.setState({books: data})})}
  // refreshBooks = () => {BooksAPI.getAll().then(data => {this.setState({all_books: data})})}
  refreshShelf = (book, shelf) => {BooksAPI.update(book, shelf).then(response => {this.updateData()})}

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({all_books: books})
  }

  render() {
    return (
      // The app has two main routes: ./ for main page and ./search for searching page.
      <div className="app">
        <Route exact path='/' render={() => <MainBooksPage curBooks={this.state.all_books}/>}/>
        <Route path="/search" render={() => <BookSearch updateShelf={this.refreshShelf} curBooks={this.state.all_books}/>}/>
      </div>
    )
  }
}

export default BooksApp
