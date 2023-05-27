import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
const TeamStatistics = ({ teamId, selectedLeague }) => {
  const [teamStatistics, setTeamStatistics] = useState();
  Chart.register(...registerables);

  useEffect(() => {
    const storedTeamStatistics = localStorage.getItem(`teamStatistics-${teamId}`);
    console.log("Team Statistics found in local storage");
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
      console.log("Fetching team statistics...");
      const storedTeamStatistics = localStorage.getItem(`teamStatistics-${teamId}`);
      if (!storedTeamStatistics) {
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
        console.log("Fetched team statistics:", teamStatisticsData);
        localStorage.setItem(`teamStatistics-${teamId}`, JSON.stringify(teamStatisticsData));
        setTeamStatistics(teamStatisticsData);
      }
    } catch (error) {
      console.error('Error fetching team statistics:', error);
    }
  };

  const renderGoalDistribution = () => {
    const minuteDataFor = teamStatistics?.goals?.for?.minute;
    const minuteDataAgainst = teamStatistics?.goals?.against?.minute;

    if (minuteDataFor && minuteDataAgainst) {
      const labels = Object.keys(minuteDataFor);
      const dataFor = Object.values(minuteDataFor).map((data) => data.total);
      const dataAgainst = Object.values(minuteDataAgainst).map((data) => data.total);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'For',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
            data: dataFor,
          },
          {
            label: 'Against',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: dataAgainst,
          },
        ],
      };

      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      return (
        <Card>
          <Card.Body>
            <Card.Title>Goal Distribution</Card.Title>
            <Bar data={chartData} options={chartOptions} />
          </Card.Body>
        </Card>
      );
    }

    return null;
  };

  return (
    <div>
      <h2>Team Statistics</h2>
      {teamStatistics && teamStatistics.goals && (
        <Card>
          <Card.Body>
            <Card.Title>Goals</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Total: {teamStatistics.goals.for.total.total}</ListGroup.Item>
              <ListGroup.Item>Home: {teamStatistics.goals.for.total.home}</ListGroup.Item>
              <ListGroup.Item>Away: {teamStatistics.goals.for.total.away}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
      {teamStatistics && teamStatistics.goals && (
        <Card>
          <Card.Body>
            <Card.Title>Goals Against</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Total: {teamStatistics.goals.against.total.total}</ListGroup.Item>
              <ListGroup.Item>Home: {teamStatistics.goals.against.total.home}</ListGroup.Item>
              <ListGroup.Item>Away: {teamStatistics.goals.against.total.away}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
      {teamStatistics && teamStatistics.fixtures && (
        <Card>
          <Card.Body>
            <Card.Title>Wins and Losses</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Wins: {teamStatistics.fixtures.wins.total}</ListGroup.Item>
              <ListGroup.Item>Losses: {teamStatistics.fixtures.loses.total}</ListGroup.Item>
              <ListGroup.Item>Draws: {teamStatistics.fixtures.draws.total}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
      {teamStatistics && teamStatistics.lineups && (
        <Card>
          <Card.Body>
            <Card.Title>Lineups</Card.Title>
            <ListGroup variant="flush">
              {Object.values(teamStatistics.lineups).map((lineupGroup, index) => (
                <React.Fragment key={index}>
                  {lineupGroup.formation && (
                    <ListGroup.Item>
                      Formation: {lineupGroup.formation}<br />
                      Played: {lineupGroup.played}
                    </ListGroup.Item>
                  )}
                  {lineupGroup.formation === undefined && (
                    <ListGroup.Item>
                      Formation: N/A<br />
                      Played: N/A
                    </ListGroup.Item>
                  )}
                </React.Fragment>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}
      {teamStatistics && teamStatistics.cards && (
        <Card>
          <Card.Body>
            <Card.Title>Cards</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Yellow:
                <ListGroup>
                  {Object.entries(teamStatistics.cards.yellow).map(([timeRange, cardData]) => (
                    <ListGroup.Item key={timeRange}>
                      {timeRange}: {cardData.total} ({cardData.percentage})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                Red:
                <ListGroup>
                  {Object.entries(teamStatistics.cards.red).map(([timeRange, cardData]) => (
                    <ListGroup.Item key={timeRange}>
                      {timeRange}: {cardData.total} ({cardData.percentage})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
      {renderGoalDistribution()}
    </div>
  );
};

export default TeamStatistics;
