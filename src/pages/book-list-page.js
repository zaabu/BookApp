import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/book-list';
import { BookContext } from '../context/book-context';
import FlashMessage, { flashErrorMessage } from '../components/flash-message';

export default function BookListPage() {
  const [state, dispatch] = useContext(BookContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3030/books');
        dispatch({
          type: 'FETCH_BOOKS',
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>List of Books</h1>
      {state.message.content && <FlashMessage message={state.message} />}
      <BookList books={state.books} />
    </div>
  );
}
