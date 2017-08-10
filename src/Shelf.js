import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const Shelf = ({name, books, onBookShelfChange}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => <li key={book.id}><Book book={book} onBookShelfChange={onBookShelfChange} /></li>)}
            </ol>
        </div>
    </div>
);

Shelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
};

export default Shelf;