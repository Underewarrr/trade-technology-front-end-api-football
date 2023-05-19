import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProtectedRoute from '../../../hoc/component/ProtectedRoute';

const Panel = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const renderRedirect = () => {
    switch (selectedOption) {
      case 'countries':
        return <Navigate to="/user/panel/countries" />;
      case 'leagues':
        return <Navigate to="/user/panel/leagues" />;
      case 'seasons':
        return <Navigate to="/user/panel/seasons" />;
      case 'teams':
        return <Navigate to="/user/panel/teams" />;
      default:
        return null;
    }
  };

  return (
    <div>
      
      <ProtectedRoute />
      <Header />
      {renderRedirect()}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Body>
            <Card.Title>Countries</Card.Title>
            <Card.Text>Explore countries information.</Card.Text>
            <Button
              variant={selectedOption === 'countries' ? 'primary' : 'outline-primary'}
              onClick={() => handleOptionSelect('countries')}
            >
              Select
            </Button>
          </Card.Body>
        </Card>


        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Body>
            <Card.Title>Leagues</Card.Title>
            <Card.Text>Explore leagues information.</Card.Text>
            <Button
              variant={selectedOption === 'leagues' ? 'primary' : 'outline-primary'}
              onClick={() => handleOptionSelect('leagues')}
            >
              Select
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Body>
            <Card.Title>Seasons</Card.Title>
            <Card.Text>Discover seasons details.</Card.Text>
            <Button
              variant={selectedOption === 'seasons' ? 'primary' : 'outline-primary'}
              onClick={() => handleOptionSelect('seasons')}
            >
              Select
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Body>
            <Card.Title>Teams</Card.Title>
            <Card.Text>View teams data.</Card.Text>
            <Button
              variant={selectedOption === 'teams' ? 'primary' : 'outline-primary'}
              onClick={() => handleOptionSelect('teams')}
            >
              Select
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Panel;
