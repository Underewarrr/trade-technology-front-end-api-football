import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../../hoc/component/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import axios from 'axios';

interface Season {
  season: {
    id: number;
    start: string;
    end: string;
    current: boolean;
  };
}

const Seasons = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);

  const fetchSeasonsData = async () => {
    try {
      const apiKey = localStorage.getItem('apiKey');
      const response = await axios.get('https://v3.football.api-sports.io/seasons', {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': apiKey,
        },
      });
      setSeasons(response.data.response);
      console.log('Season   ', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSeasonsData();
  }, []);

  return (
    <div>
      <Header />
      <ProtectedRoute />
      <h1>Seasons</h1>
      <ul>
        {seasons.map((season) => (
          <li key={season.season.id}>
            Season ID: {season.season.id}, Start: {season.season.start}, End: {season.season.end}
            {season.season.current && <span> (Current Season)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seasons;
