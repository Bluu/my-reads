import React from 'react';
import PropTypes from 'prop-types';

const Book = ({book: {id, title, authors, imageLinks, shelf}, onBookShelfChange}) => (
    <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : ''})` }}></div>
        <div className="book-shelf-changer">
            <select defaultValue={shelf ? shelf : 'none'} onChange={(event) => onBookShelfChange({id}, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{!authors ? null : authors.join(', ')}</div>
    </div>
);

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
};

export default Book;