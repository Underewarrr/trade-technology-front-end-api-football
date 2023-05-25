import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

const PlayerList = ({ teamId }) => {
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    const storedSquad = JSON.parse(localStorage.getItem(`squad_${teamId}`));
    console.log("Player Squad found in localstorage", storedSquad)
    if (storedSquad && storedSquad.length > 0) {
      setSquad(storedSquad);
    } else {
      fetchSquad();
    }
  }, [teamId]);

  const fetchSquad = async () => {
    const apiKey = localStorage.getItem('apiKey');

    try {
      const response = await fetch(
        `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        }
      );

      const data = await response.json();
      console.log('Squad:', data);
      setSquad(data.response[0].players);
      localStorage.setItem(`squad_${teamId}`, JSON.stringify(data.response[0].players));
    } catch (error) {
      console.error('Error fetching squad:', error);
    }
  };

  return (
    <div>
      <h2>Squad</h2>
      <div className="card-container">
        {squad.map((player) => (
          <Card key={player.id} style={{ width: '18rem' }}>
            <div className="card-img-container">
              <Card.Img
                variant="top"
                src={player.photo}
                alt={player.name}
                className="player-photo"
              />
            </div>
            <Card.Body>
              <Card.Title>{player.name}</Card.Title>
              {/* Add more player information as needed */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
