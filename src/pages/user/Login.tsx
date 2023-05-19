import React, { useEffect, useState } from 'react';
import { setKey } from '../../services/requests/request-football-api';

import { Alert, Container, Button, Card, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event: any) => {
    event.preventDefault();

    try {

      localStorage.setItem('apiKey', apiKey);
      setIsLogged(true);
      
    } catch (error) {
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

  if (isLogged) return <Navigate to="/user/panel/leagues" />;

  return (
    <>
      <Form>
        <Card>
          <Card.Header>Login</Card.Header>
          <Container>
            <center>
              <Card.Body>
                <Form.Group className="mb-3" controlId="FormasicApiKey">
                  <Form.Label>API Key :</Form.Label>
                  <Form.Control
                    value={apiKey}
                    onChange={({ target: { value } }) => setApiKey(value)}
                    name="apiKey"
                    type="text"
                    placeholder=" Enter your API Key"
                  />
                </Form.Group>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(event) => login(event)}
                >
                  Login
                </Button>
          
              </Card.Footer>
            </center>
          </Container>
        </Card>
      </Form>
    </>
  );
};
