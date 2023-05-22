import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Standings = () => {
  const [leagueId, setLeagueId] = useState('');
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    if (leagueId) {
      // Make API request to fetch standings for the selected league
      fetchStandings(leagueId);
    } else {
      setStandings([]);
    }
  }, [leagueId]);

  const fetchStandings = async (leagueId) => {
    try {
      const apiKey = localStorage.getItem('apiKey');
      console.log('Fetching standings...');
      const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueId}`, {
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': apiKey || '',
        },
      });
      console.log('Standings:', response.data.response);
      setStandings(response.data.response);
    } catch (error) {
      console.error('Error fetching standings:', error);
    }
  };

  const handleLeagueChange = (event) => {
    setLeagueId(event.target.value);
  };

  return (
    <div>
      <h1>Standings</h1>
      <select value={leagueId} onChange={handleLeagueChange}>
        <option value="">Select a league</option>
        {/* Populate the select options with the available leagues */}
      </select>

      {standings.length > 0 && (
        <div>
          <h2>League Standings</h2>
          {/* Display the standings data */}
        </div>
      )}
    </div>
  );
};

export default Standings;
