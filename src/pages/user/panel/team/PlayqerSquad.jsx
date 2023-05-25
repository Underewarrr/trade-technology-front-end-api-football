import React, { useEffect, useState } from 'react';

const PlayerList = ({ teamId }) => {
  const [squad, setSquad] = useState([]);

  useEffect(() => {
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
      } catch (error) {
        console.error('Error fetching squad:', error);
      }
    };

    fetchSquad();
  }, [teamId]);

  return (
    <div>
      <h2>Squad</h2>
      <ul>
        {squad.map((player) => (
          <li key={player.id}>
            <img src={player.photo} alt={player.name} />
            <p>Name: {player.name}</p>
            {/* Add more player information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
