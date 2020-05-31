import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import BookListPage from './pages/book-list-page';
import BookFormPage from './pages/book-form-page';
import config from './config';
import CustomLoginComponent from './components/login';
import NavBar from './components/NavBar';


const HasAccessToRouter = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login');
  };

  return (
    <Security
      {...config}
      onAuthRequired={customAuthHandler}
    >
      <NavBar />
      <Container text style={{ marginTop: '7em' }}>
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/login" exact component={CustomLoginComponent} />
        <SecureRoute exact path="/" component={BookListPage} />
        <SecureRoute path="/books/new" component={BookFormPage} />
        <SecureRoute path="/books/edit/:_id" component={BookFormPage} />
      </Container>
    </Security>
  );
};

const App = () => (
  <div>
    <Router>
      <HasAccessToRouter />
    </Router>
  </div>
);

export default App;
