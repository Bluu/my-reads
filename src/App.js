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
    this.handleOnBookShelfChange = this.handleOnBookShelfChange.bind(this);
    this.handleOnSearchBook = this.handleOnSearchBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books = this.mapBooks(books);
      this.setState({books});
    });
  }

  handleOnBookShelfChange(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;

      this.setState({
        books: this.state.books.filter(b => b.id !== book.id).concat([ book ]),
        booksFound: this.state.booksFound.map(b => {
          if (b.id === book.id) b.shelf = shelf;
          return b;
        }),
      })
    });
  }

  handleOnSearchBook(query) {
    if (query) {
      BooksAPI.search(query, 20).then(res => {
        if (!res.error) {
          let booksFound = this.mapBooks(res);

          booksFound.map((book) => {
            const shelvedBook = this.state.books.find(b => b.id === book.id) || {};
            return book.shelf = shelvedBook.shelf;
          })

          this.setState({booksFound});
        } else {
          console.log(res.error);
        }
      });
    }
  }

  mapBooks(books) {
    return books.map(({id, title, authors, imageLinks: {thumbnail}, shelf}) => ({id, title, authors, thumbnail, shelf}));
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
