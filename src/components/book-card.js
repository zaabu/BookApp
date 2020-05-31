import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookContext } from '../context/book-context';
import { flashErrorMessage } from './flash-message';

const { useContext } = React;

export default function BookCard({ book }) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(BookContext);

  const deleteBook = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/books/${id}`,
      );
      dispatch({
        type: 'DELETE_CONTACT',
        payload: response.data,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {book.title} 
        </Card.Header>

        <div>
          <img className="book-poster" src={book.image} alt="book-poster" />
        </div>
        <Card.Description>
          <p>
            {book.author}
          </p>
          <p>
            ISBN: {book.isbn}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            as={Link}
            to={`/books/edit/${book._id}`}
          >
            Edit
          </Button>
          <Button basic color="red" onClick={() => deleteBook(book._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
