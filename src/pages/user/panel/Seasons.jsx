import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Seasons = ({ setSelectedSeason }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    if (selectedLeague) {
      // Make API request to fetch seasons for the selected league
      fetchSeasons(selectedLeague);
    } else {
      setSeasons([]);
    }
  }, [selectedLeague]);

  const fetchSeasons = async (leagueId) => {
    try {
      const apiKey = localStorage.getItem('apiKey');
      console.log('Fetching seasons...');
      const response = await axios.get(`https://v3.football.api-sports.io/seasons?league=${leagueId}`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': apiKey || '',
        },
      });
      console.log('Seasons:', response.data.response);
      setSeasons(response.data.response);
    } catch (error) {
      console.error('Error fetching seasons:', error);
    }
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <div>
      <h2>Seasons</h2>
      <select value={selectedLeague} onChange={(event) => setSelectedLeague(event.target.value)}>
        <option value="">Select a league</option>
        {leagues.map((league) => (
          <option key={league.league.id} value={league.league.id}>
            {league.league.name}
          </option>
        ))}
      </select>
      {seasons.length > 0 && (
        <div>
          <h2>Seasons</h2>
          <select value={selectedSeason} onChange={handleSeasonChange}>
            <option value="">Select a season</option>
            {seasons.map((season) => (
              <option key={season.season.id} value={season.season.id}>
                {season.season.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Seasons;
