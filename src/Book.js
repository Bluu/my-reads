import React from 'react';
import PropTypes from 'prop-types';

const Book = ({book: {id, title, authors, thumbnail, shelf}, onBookShelfChange}) => (
    <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ backgroundImage: `url(${thumbnail ? thumbnail : ''})` }}></div>
        <div className="book-shelf-changer">
            <select defaultValue={shelf ? shelf : 'none'} onChange={(event) => onBookShelfChange({id, title, authors, thumbnail, shelf}, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">{shelf === 'currentlyReading' ? String.fromCharCode(10004) : ''} Currently Reading</option>
                <option value="wantToRead">{shelf === 'wantToRead' ? String.fromCharCode(10004) : ''} Want to Read</option>
                <option value="read">{shelf === 'read' ? String.fromCharCode(10004) : ''} Read</option>
                <option value="none">{!shelf ? String.fromCharCode(10004) : ''} None</option>
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