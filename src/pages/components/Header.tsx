import React, { useState, ChangeEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  const [apiKey, setApiKey] = useState<string>(window.localStorage.getItem('apiKey') || '');

  const handleApiKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const renderLoginInput = () => {
    return (
      <Navbar.Text>
        <input type="text" value={apiKey} onChange={handleApiKeyChange} placeholder="Enter API Key" />
        <button>Login</button>
      </Navbar.Text>
    );
  };

  const renderLoggedInUser = () => {
    return (
      <Navbar.Text>
        Signed in as: <a href="`/user/{$apiKey}`">KEY : {apiKey}</a>
      </Navbar.Text>
    );
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/user/panel/">Football API</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {apiKey ? renderLoggedInUser() : renderLoginInput()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
