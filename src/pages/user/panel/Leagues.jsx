import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leagues = ({ setLeagueId }) => {
  const [countries, setCountries] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track data fetch

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
    }
  }, [selectedCountry]);

  const fetchCountries = async () => {
    try {
      const storedCountries = localStorage.getItem('countries');
      if (storedCountries) {
        setCountries(JSON.parse(storedCountries));
        setDataFetched(true); // Data already fetched
      } else {
        const apiKey = localStorage.getItem('apiKey');
        console.log('Fetching countries...');
        const response = await axios.get('https://v3.football.api-sports.io/countries', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        });
        console.log('Countries:', response.data.response);
        setCountries(response.data.response);
        localStorage.setItem('countries', JSON.stringify(response.data.response));
        setDataFetched(true); // Data fetched and stored
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchLeagues = async (countryId) => {
    try {
      const storedLeagues = localStorage.getItem(`leagues-${countryId}`);
      if (storedLeagues) {
        setLeagues(JSON.parse(storedLeagues));
      } else {
        const apiKey = localStorage.getItem('apiKey');
        console.log('Fetching leagues...');
        const response = await axios.get('https://v3.football.api-sports.io/leagues', {
          params: {
            country: countryId,
          },
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        });
        console.log('Leagues:', response.data.response);
        setLeagues(response.data.response);
        localStorage.setItem(`leagues-${countryId}`, JSON.stringify(response.data.response));
      }
    } catch (error) {
      console.error('Error fetching leagues:', error);
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
      <h1>Countries</h1>
      {!dataFetched ? (
        <p>Loading...</p>
      ) : (
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      )}
      {leagues.length > 0 && (
        <div>
          <h2>Leagues</h2>
          <select value={selectedLeague} onChange={handleLeagueChange}>
            <option value="">Select a league</option>
            {leagues.map((league) => (
              <option key={league.league.id} value={league.league.id}>
                {league.league.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Leagues;
