import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'fomantic-ui-css/semantic.min.css';
import './index.css';
import { BookContextProvider } from './context/book-context';

ReactDOM.render(
  <BookContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BookContextProvider>,
  document.getElementById('root'),
);
