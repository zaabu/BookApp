import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from '../components/book-form';
import { flashErrorMessage } from '../components/flash-message';
import { BookContext } from '../context/book-context';
import {
  useParams
} from "react-router-dom";

 
export default function BookFormPage({ match }) {
  const [state, dispatch] = useContext(BookContext);
  const [loading, setLoading] = useState(true);

  const { _id } = useParams();


  useEffect(() => {
    
    // Grab URL _id
    if (_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3030/books/${_id}`,
          );
          dispatch({
            type: 'FETCH_CONTACT',
            payload: response.data,
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [_id, dispatch]);

  if (loading) {
    return <p>Please wait...</p>;
  }

  return (
    <div>
      <BookForm book={state.book} />
    </div>
  );
}
