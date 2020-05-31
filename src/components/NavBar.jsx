import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import logo from '../logo.svg';

const Navbar = () => {
  const { authState, authService } = useOktaAuth();

  const logout = async () => authService.logout('/');

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header href="/">
            <Image size="mini" src={logo} />
            &nbsp;
            Book Library
          </Menu.Item>

          
          {authState.isAuthenticated && <Menu.Item id="book-list" as="a" href="/">Books List</Menu.Item>}

        
          {authState.isAuthenticated && <Menu.Item id="book-list" as="a" href="/books/new">Add Book</Menu.Item>}

          {authState.isAuthenticated && <Menu.Item id="logout-button" as="a" onClick={logout}>Logout</Menu.Item>}
          
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;