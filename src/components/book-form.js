import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { BookContext } from '../context/book-context';
import { flashErrorMessage } from './flash-message';

export default function BookForm({ book }) {
  const [state, dispatch] = useContext(BookContext);
  const [redirect, setRedirect] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    defaultValues: book,
  });

  const createBook = async data => {
    try {
      const response = await axios.post('http://localhost:3030/books', data);
      dispatch({
        type: 'CREATE_CONTACT',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const updateBook = async data => {
    try {
      const response = await axios.patch(
        `http://localhost:3030/books/${book._id}`,
        data,
      );
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async data => {
    if (book._id) {
      await updateBook(data);
    } else {
      await createBook(data);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: '1em' }}>
          {book._id ? 'Edit Book' : 'Add New Book'}
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          {/* <Form.Group widths="equal"> */}
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="title">
                Title
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.title &&
                  errors.title.type === 'required' &&
                  'You need to provide Book Title'}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="Author">
                Author
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Author"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.author &&
                  errors.author.type === 'required' &&
                  'You need to provide Book Author'}
              </span>
              <span className="error">
                {errors.author &&
                  errors.author.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="ISBN">
                ISBN
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  placeholder="Isbn"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.author &&
                  errors.author.type === 'required' &&
                  'You need to provide ISBN'}
              </span>
              <span className="error">
                {errors.isbn &&
                  errors.isbn.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="Image">
                Image
                <input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="image"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.image &&
                  errors.image.type === 'required' &&
                  'You need to provide Image Url'}
              </span>
              <span className="error">
                {errors.isbn &&
                  errors.isbn.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
            
          {/* </Form.Group> */}
         
          <Button primary type="submit">
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
