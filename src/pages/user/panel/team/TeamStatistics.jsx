import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamStatistics = () => {
  const [teamStatistics, setTeamStatistics] = useState(null);

  useEffect(() => {
    const fetchTeamStatistics = async () => {
      // Retrieve the necessary values from local storage
      const selectedSeason = localStorage.getItem('selectedSeason');
      const selectedTeamId = localStorage.getItem('selectedTeam');
      const selectedLeagueId = localStorage.getItem('selectedLeagueId');
      const apiKey = localStorage.getItem('apiKey');

      try {
        const response = await axios.get('https://v3.football.api-sports.io/teams/statistics', {
            params: {
                league: selectedLeagueId,
                season: `${selectedLeagueId}-${selectedSeason}`,
                team: selectedTeamId,
            },
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': apiKey || '',
            },
            });


        setTeamStatistics(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeamStatistics();
  }, []);

  return (
    <div>
      <h1>Team Statistics</h1>
      {teamStatistics && teamStatistics.response.length > 0 ? (
  <div>
    <p>Goals Scored: {teamStatistics.response[0].team.statistics.goals.scored}</p>
    <p>Goals Conceded: {teamStatistics.response[0].team.statistics.goals.conceded}</p>
    {/* Display more team statistics as needed */}
  </div>
) : (
  <p>No team statistics available.</p>
)}
    </div>
  );
};

export default TeamStatistics;
