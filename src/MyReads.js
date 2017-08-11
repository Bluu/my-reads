import React from 'react';
import { Link } from 'react-router-dom'

import Shelf from './Shelf';

const MyReads = ({books, handleOnBookShelfChange}) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <Shelf name="Currently Reading" books={books.filter(({shelf}) => shelf === 'currentlyReading')} onBookShelfChange={handleOnBookShelfChange} />
                <Shelf name="Want to Read" books={books.filter(({shelf}) => shelf === 'wantToRead')} onBookShelfChange={handleOnBookShelfChange} />
                <Shelf name="Read" books={books.filter(({shelf}) => shelf === 'read')} onBookShelfChange={handleOnBookShelfChange} />
            </div>
        </div>
        <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
    </div> 
);

export default MyReads;