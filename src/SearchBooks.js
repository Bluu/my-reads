import React from 'react';
import { Link } from 'react-router-dom';

import Shelf from './Shelf';

const SearchBooks = ({booksFound, handleOnBookShelfChange, handleOnSearchBook}) => (
    <div className="search-books">
        <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper"> 
            <input type="text" placeholder="Search by title or author" onChange={(event) => handleOnSearchBook(event.target.value)} />
            
            </div>
        </div>
        <div className="search-books-results">
            <Shelf name="Books Found" books={booksFound} onBookShelfChange={handleOnBookShelfChange} />
        </div>
    </div>
);

export default SearchBooks;