import React from 'react'

import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
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
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleOnSearchBook(event.target.value)} />
                
              </div>
            </div>
            <div className="search-books-results">
              { !this.state.booksFound ? null : <Shelf name="Books Found" books={this.state.booksFound} onBookShelfChange={this.handleOnBookShelfChange} /> }
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf name="Currently Reading" books={this.state.books.filter(({shelf}) => shelf === 'currentlyReading')} onBookShelfChange={this.handleOnBookShelfChange} />
                <Shelf name="Want to Read" books={this.state.books.filter(({shelf}) => shelf === 'wantToRead')} onBookShelfChange={this.handleOnBookShelfChange} />
                <Shelf name="Read" books={this.state.books.filter(({shelf}) => shelf === 'read')} onBookShelfChange={this.handleOnBookShelfChange} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
