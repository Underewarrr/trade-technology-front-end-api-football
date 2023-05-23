import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Form, Container } from 'react-bootstrap';
import Header from '../../components/Header';

const Leagues = ({ setLeagueId }) => {
  const [countries, setCountries] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [dataFetched, setDataFetched] = useState(false); // Flag to track data fetch
  const [showAlert, setShowAlert] = useState(false); // Flag to show/hide the alert

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

  useEffect(() => {
    if (selectedLeague) {
      // Make API request to fetch seasons for the selected league
      fetchSeasons(selectedLeague);
    } else {
      setSeasons([]);
    }
  }, [selectedLeague]);

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

  const fetchSeasons = async () => {
    try {
      const storedSeasons = localStorage.getItem('seasons');
      if (storedSeasons) {
        setSeasons(JSON.parse(storedSeasons));
      } else {
        const apiKey = localStorage.getItem('apiKey');
        console.log('Fetching seasons...');
        const response = await axios.get('https://v3.football.api-sports.io/leagues/seasons', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        });
        console.log('Seasons:', response.data.response);
        setSeasons(response.data.response);
        localStorage.setItem('seasons', JSON.stringify(response.data.response));
      }
    } catch (error) {
      console.error('Error fetching seasons:', error);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedLeague(''); // Reset selected league when country changes
    setSelectedSeason(''); // Reset selected season when country changes
  };

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
    setSelectedSeason(''); // Reset selected season when league changes
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleStoreSelection = () => {
    try {
      localStorage.setItem('selectedCountry', selectedCountry);
      localStorage.setItem('selectedLeague', selectedLeague);
      localStorage.setItem('selectedSeason', selectedSeason);
      setShowAlert(true);
    } catch (error) {
      console.error('Error storing selected country, league, and season:', error);
    }
  };

  return (
    <><Header /><Container>
      <h1>Countries</h1>
      {!dataFetched ? (
        <p>Loading...</p>
      ) : (
        <Form>
          <Form.Group controlId="countrySelect">
            <Form.Label>Select a country</Form.Label>
            <Form.Control as="select" value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      )}
      {leagues.length > 0 && (
        <div>
          <h2>Leagues</h2>
          <Form>
            <Form.Group controlId="leagueSelect">
              <Form.Label>Select a league</Form.Label>
              <Form.Control as="select" value={selectedLeague} onChange={handleLeagueChange}>
                <option value="">Select a league</option>
                {leagues.map((league) => (
                  <option key={league.league.id} value={league.league.id}>
                    {league.league.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
      )}
      {seasons.length > 0 && (
        <div>
          <h2>Seasons</h2>
          <Form>
            <Form.Group controlId="seasonSelect">
              <Form.Label>Select a season</Form.Label>
              <Form.Control as="select" value={selectedSeason} onChange={handleSeasonChange}>
                <option value="">Select a season</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
            Selected country, league, and season stored successfully!
          </Alert>
          <button type="button" className="btn btn-primary" onClick={handleStoreSelection}>
            Save Selection
          </button>
        </div>

      )}
    </Container></>
  );
};

export default Leagues;
