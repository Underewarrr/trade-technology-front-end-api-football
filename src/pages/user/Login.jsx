import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Form, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';

export const Login = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = (event) => {
    event.preventDefault();

    if (apiKey.length > 20) {
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
                  <Alert variant="danger" data-testid="error-alert">
                    API Key must be at least 20 characters long.
                  </Alert>
                )}
                <Form.Group className="mb-3" controlId="FormasicApiKey">
                  <Form.Label>API Key:</Form.Label>
                  <Form.Control
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                    name="apiKey"
                    type="text"
                    placeholder="Enter your API Key"
                    data-testid="api-key-input" // Updated data-testid attribute
                  />
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={login}
                  data-testid="login-button"
                >
                  Sign
                </Button>
              </Card.Footer>
            </center>
          </Container>
        </Card>
      </Form>
    </>
  );
};
