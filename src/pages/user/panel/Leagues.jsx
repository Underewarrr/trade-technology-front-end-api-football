import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leagues = ({ setLeagueId }) => {
  const [countries, setCountries] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Make API request to fetch the list of countries
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Make API request to fetch leagues for the selected country
      fetchLeagues(selectedCountry);
    } else {
      setLeagues([]);
      setTeams([]);
      setMatches([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedLeague) {
      // Make API request to fetch matches for the selected league
      fetchMatches(selectedLeague);
    } else {
      setMatches([]);
    }
  }, [selectedLeague]);

  const fetchCountries = async () => {
    try {
      console.log('Fetching countries...');
      const response = await axios.get('https://www.api-football.com/demo/api/countries');
      console.log('Countries:', response.data.api.countries);
      setCountries(response.data.api.countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchLeagues = async (countryId) => {
    try {
      console.log('Fetching leagues...');
      const response = await axios.get(`https://www.api-football.com/demo/api/leagues/${countryId}`);
      console.log('Leagues:', response.data.api.leagues);
      setLeagues(response.data.api.leagues);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  const fetchMatches = async (leagueId) => {
    try {
      console.log('Fetching matches...');
      const response = await axios.get(`https://www.api-football.com/demo/api/fixtures/league/${leagueId}`);
      console.log('Matches:', response.data.api.fixtures);
      setMatches(response.data.api.fixtures);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
    setLeagueId(event.target.value);
  };

  return (
    <div>
      <h1>Leagues</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.country_id} value={country.country_id}>
            {country.country_name}
          </option>
        ))}
      </select>
      {leagues.length > 0 && (
        <div>
          <h2>Leagues</h2>
          <select value={selectedLeague} onChange={handleLeagueChange}>
            <option value="">Select a league</option>
            {leagues.map((league) => (
              <option key={league.league_id} value={league.league_id}>
                {league.league_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Display the matches */}
      {matches.length > 0 && (
        <div>
          <h2>Matches</h2>
          <ul>
            {matches.map((match) => (
              <li key={match.fixture_id}>{match.event_date}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Leagues;
