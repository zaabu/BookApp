import React, { useReducer, createContext } from 'react';

export const BookContext = createContext();

const initialState = {
  books: [],
  book: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_CONTACTS': {
      return {
        ...state,
        books: action.payload,
        book: {},
      };
    }
    case 'FLASH_MESSAGE': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'CREATE_CONTACT': {
      return {
        ...state,
        books: [...state.books, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New Book created!',
        },
      };
    }
    case 'FETCH_CONTACT': {
      return {
        ...state,
        book: action.payload,
        message: {},
      };
    }
    case 'UPDATE_CONTACT': {
      const book = action.payload;
      return {
        ...state,
        books: state.books.map(item =>
          item._id === book._id ? book : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Book "${book.email}" has been updated!`,
        },
      };
    }
    case 'DELETE_CONTACT': {
      const { _id, email } = action.payload;
      return {
        ...state,
        books: state.books.filter(item => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete Successful',
          content: `Book "${email}" has been deleted!`,
        },
      };
    }
    default:
      throw new Error();
  }
}

export const BookContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <BookContext.Provider value={[state, dispatch]}>
      {children}
    </BookContext.Provider>
  );
};
