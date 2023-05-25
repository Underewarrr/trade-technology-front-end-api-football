import React, { useEffect, useState } from 'react';

const PlayerList = ({ teamId }) => {
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    const storedSquad = JSON.parse(localStorage.getItem('squad'));
    console.log("Stored Squad Found in LocalStorage", storedSquad)
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
      localStorage.setItem('squad', JSON.stringify(data.response[0].players));
    } catch (error) {
      console.error('Error fetching squad:', error);
    }
  };

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
