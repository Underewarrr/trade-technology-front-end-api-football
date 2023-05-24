import React, { useEffect, useState } from 'react';

const PlayerList = ({ leagueId, season }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const apiKey = localStorage.getItem('apiKey');

    try {
      const response = await fetch(
        `https://v3.football.api-sports.io/players?league=${leagueId}&season=${season}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        }
      );

      const data = await response.json();
      console.log('Player List:', data);
      setPlayers(data.response);
    } catch (error) {
      console.error('Error fetching player list:', error);
    }
  };

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.player.id}>
            <img src={player.player.photo} alt={player.player.name} />
            <p>Name: {player.player.name}</p>
            <p>Team: {player.statistics[0].team.name}</p>
            <p>League: {player.statistics[0].league.name}</p>
            {/* Add more player information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
