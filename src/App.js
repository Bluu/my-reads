import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReads from './MyReads';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    booksFound: []
  }

  constructor() {
    super();
    this.loadBooks = this.loadBooks.bind(this);
    this.handleOnBookShelfChange = this.handleOnBookShelfChange.bind(this);
    this.handleOnSearchBook = this.handleOnSearchBook.bind(this);
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    BooksAPI.getAll().then(books => this.setState({books}));
  }

  handleOnBookShelfChange(book, shelf) {
    const loadBooks = this.loadBooks;
    BooksAPI.update(book, shelf).then(() => loadBooks());
  }

  handleOnSearchBook(query) {
    if (query) {
      BooksAPI.search(query, 20).then(res => !res.error ? this.setState({booksFound: res}) : console.log(res.error));
    }
  }

  render() {
    return (
        <div>
          <Route exact path="/" render={() => <MyReads books={this.state.books} handleOnBookShelfChange={this.handleOnBookShelfChange} />}/>
          <Route exact path="/search" render={() => <SearchBooks booksFound={this.state.booksFound} handleOnBookShelfChange={this.handleOnBookShelfChange} handleOnSearchBook={this.handleOnSearchBook} />}/>
        </div>
    )
  }
}

export default BooksApp
