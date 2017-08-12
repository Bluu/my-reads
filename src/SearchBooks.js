import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

SearchBooks.propTypes = {
    booksFound: PropTypes.array.isRequired,
    handleOnBookShelfChange: PropTypes.func.isRequired,
    handleOnSearchBook: PropTypes.func.isRequired,
};

export default SearchBooks;