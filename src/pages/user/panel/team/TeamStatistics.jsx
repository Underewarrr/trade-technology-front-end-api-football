import React, { useEffect, useState } from 'react';

const TeamStatistics = ({ teamId, selectedLeague }) => {
  const [teamStatistics, setTeamStatistics] = useState(null);

  useEffect(() => {
    const storedTeamStatistics = localStorage.getItem(`teamStatistics-${teamId}`);
    if (storedTeamStatistics) {
      setTeamStatistics(JSON.parse(storedTeamStatistics));
    } else {
      fetchTeamStatistics();
    }
  }, [teamId, selectedLeague]);

  const fetchTeamStatistics = async () => {
    const apiKey = localStorage.getItem('apiKey');
    const selectedSeason = localStorage.getItem('selectedSeason');

    try {
      const response = await fetch(
        `https://v3.football.api-sports.io/teams/statistics?team=${teamId}&season=${selectedSeason}&league=${selectedLeague}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        }
      );

      const data = await response.json();
      const teamStatisticsData = data.response;
      localStorage.setItem(`teamStatistics-${teamId}`, JSON.stringify(teamStatisticsData));
      setTeamStatistics(teamStatisticsData);
    } catch (error) {
      console.error('Error fetching team statistics:', error);
    }
  };

  return (
    <div>
      <h2>Team Statistics</h2>
      {teamStatistics && teamStatistics.goals && (
        <div>
          <p>Goals For:</p>
          <ul>
            <li>Total: {teamStatistics.goals.for.total.home}</li>
            <li>Home: {teamStatistics.goals.for.total.away}</li>
            <li>Away: {teamStatistics.goals.for.total.total}</li>
          </ul>
          <p>Goals Against:</p>
          <ul>
            <li>Total: {teamStatistics.goals.against.total.home}</li>
            <li>Home: {teamStatistics.goals.against.total.away}</li>
            <li>Away: {teamStatistics.goals.against.total.total}</li>
          </ul>
          <p>Wins: {teamStatistics.fixtures.wins.total}</p>
          <p>Losses: {teamStatistics.fixtures.loses.total}</p>
          {/* Add more team statistics as needed */}
        </div>
      )}
    </div>
  );
};

export default TeamStatistics;
