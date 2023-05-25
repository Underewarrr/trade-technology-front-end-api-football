import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';

export const Login = () => {
  const expectedApiKey = '64b54e7f60f950a67ab08edacb0d6e98';
  const [apiKey, setApiKey] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    if (apiKey === expectedApiKey) {
      try {
        localStorage.setItem('apiKey', apiKey);
        setIsLogged(true);
      } catch (error) {
        setTimeout(() => {
          setFailedTryLogin(true);
        }, 1000);
        setIsLogged(false);
      }
    } else {
      setTimeout(() => {
        setFailedTryLogin(true);
      }, 1000);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFailedTryLogin(false);
    }, 1000);
  }, [apiKey]);

  if (isLogged) return <Navigate to="/user/panel/" />;

  return (
    <>
      <Header />
      <Form>
        <Card>
          <Card.Header>Login</Card.Header>
          <Container>
            <center>
              <Card.Body>
                {failedTryLogin && (
                  <Card.Text style={{ color: 'red' }}>Invalid API Key. Please try again.</Card.Text>
                )}
                <Form.Group className="mb-3" controlId="FormasicApiKey">
                  <Form.Label>API Key:</Form.Label>
                  <Form.Control
                    value={apiKey}
                    onChange={({ target: { value } }) => setApiKey(value)}
                    name="apiKey"
                    type="text"
                    placeholder="Enter your API Key"
                  />
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" type="submit" onClick={(event) => login(event)}>
                  Log in
                </Button>
              </Card.Footer>
            </center>
          </Container>
        </Card>
      </Form>
    </>
  );
};
