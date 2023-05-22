import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Standings = ({ leagueId }) => {
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
      const response = await axios.get(`https://v3.football.api-sports.io/standings?league=${leagueId}`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': apiKey || '',
        },
      });
      console.log('Standings:', response.data.response);
      setStandings(response.data.response);
    } catch (error) {
      console.error('Error fetching standings:', error);
    }
  };

  return (
    <div>
      <h1>Standings</h1>
      {standings.length > 0 ? (
        <div>
          <h2>League Standings</h2>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Points</th>
                {/* Add other relevant columns for standings */}
              </tr>
            </thead>
            <tbody>
              {standings.map((standing) => (
                <tr key={standing.team.id}>
                  <td>{standing.position}</td>
                  <td>{standing.team.name}</td>
                  <td>{standing.points}</td>
                  {/* Render other relevant data for each team */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Please select a league to view its standings.</p>
      )}
    </div>
  );
};

export default Standings;
