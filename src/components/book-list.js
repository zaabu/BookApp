import React from 'react';
import { Card } from 'semantic-ui-react';
import BookCard from './book-card';

export default function BookList({ books }) {
  const cards = () => {
    return books.map(book => {
      return <BookCard key={book._id} book={book} />;
    });
  };

  return <Card.Group>{cards()}</Card.Group>;
}
