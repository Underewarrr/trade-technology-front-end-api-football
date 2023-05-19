import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../../hoc/component/ProtectedRoute';
import Header from '../../components/Header';

import axios from 'axios';

interface League {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    coverage: {
      fixtures: {
        events: boolean;
        lineups: boolean;
        statistics_fixtures: boolean;
        statistics_players: boolean;
      };
      standings: boolean;
      players: boolean;
      top_scorers: boolean;
      top_assists: boolean;
      top_cards: boolean;
      injuries: boolean;
      predictions: boolean;
      odds: boolean;
    };
  };
}

const Leagues = () => {
  const [leagues, setLeagues] = useState<League[]>([]);

  const fetchLeaguesData = async () => {
    try {
      const apiKey = localStorage.getItem('apiKey');
      const response = await axios.get('https://v3.football.api-sports.io/leagues', {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': apiKey,
        },
      });
      setLeagues(response.data.response);
      console.log(`api`, response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaguesData();
  }, []);

  return (
    <div>
      <Header/>
      <ProtectedRoute/>
      <h1>Leagues</h1>
      <ul>
        {leagues.map((league) => (
          <li key={league.league.id}>
            {league.league.name}
            <img src={`https://media.api-sports.io/football/leagues/${league.league.id}.png`} alt={`${league.league.name} Logo`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leagues;
