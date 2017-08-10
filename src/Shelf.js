import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const Shelf = ({name, books}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(({id, title, authors, thumbnail, shelf}) => <li key={id}><Book title={title} authors={authors} thumbnail={thumbnail} shelf={shelf} /></li>)}
            </ol>
        </div>
    </div>
);

Shelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
};

export default Shelf;