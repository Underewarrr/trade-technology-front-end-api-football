import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  coverage: {
    fixtures: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
  };
}

const LeagueInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [league, setLeague] = useState<League | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = localStorage.getItem('apiKey');
        const response = await axios.get(`https://v3.football.api-sports.io/leagues?id=${id}`, {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        });
        setLeague(response.data.response[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!league) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{league.name}</h1>
      <img src={`https://media.api-sports.io/football/leagues/${league.id}.png`} alt={`${league.name} Logo`} />
      <h2>Country: {league.country}</h2>
      <h3>Coverage:</h3>
      <ul>
        <li>Fixtures: {league.coverage.fixtures.toString()}</li>
        <li>Lineups: {league.coverage.lineups.toString()}</li>
        <li>Statistics Fixtures: {league.coverage.statistics_fixtures.toString()}</li>
        <li>Statistics Players: {league.coverage.statistics_players.toString()}</li>
        <li>Standings: {league.coverage.standings.toString()}</li>
        <li>Players: {league.coverage.players.toString()}</li>
        <li>Top Scorers: {league.coverage.top_scorers.toString()}</li>
        <li>Top Assists: {league.coverage.top_assists.toString()}</li>
        <li>Top Cards: {league.coverage.top_cards.toString()}</li>
        <li>Injuries: {league.coverage.injuries.toString()}</li>
        <li>Predictions: {league.coverage.predictions.toString()}</li>
        <li>Odds: {league.coverage.odds.toString()}</li>
      </ul>
    </div>
  );
};

export default LeagueInfo;
