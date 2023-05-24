import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../../hoc/component/ProtectedRoute';
import TeamStatistics from './TeamStatistics';
import { Card, Image } from 'react-bootstrap'; // Import the Card and Image components from React-Bootstrap

const TeamInfo = () => {
  const [teamInfo, setTeamInfo] = useState({});
  const [selectedLeague, setSelectedLeague] = useState('');

  const currentTeamId = parseInt(localStorage.getItem('currentTeam'));

  useEffect(() => {
    // Fetch and set the team information from localStorage
    const teamsData = localStorage.getItem(`teams-${selectedLeague}`);
    if (teamsData) {
      const teams = JSON.parse(teamsData);
      const currentTeam = teams.find((team) => team.team.id === currentTeamId);
      if (currentTeam) {
        setTeamInfo(currentTeam.team);
      }
    }
  }, [currentTeamId, selectedLeague]);

  useEffect(() => {
    // Retrieve the selectedLeague from localStorage
    const storedSelectedLeague = localStorage.getItem('selectedLeague');
    if (storedSelectedLeague) {
      setSelectedLeague(storedSelectedLeague);
    }
  }, []);

  return (
    <>
      <Header />
      <ProtectedRoute />
      <div>
        <h1>Team Information</h1>
        <Card>
          <Card.Body>
            <Card.Title>Team Name</Card.Title>
            <Card.Text>{teamInfo.name}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Country</Card.Title>
            <Card.Text>{teamInfo.country}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Logo</Card.Title>
            <Image src={teamInfo.logo} alt={teamInfo.name} width={128} height={128} rounded /> {/* Display the logo as an image with a size of 128x128 pixels */}
          </Card.Body>
        </Card>
        {/* Add more Card components for additional team information */}
      </div>
      <div>
        <TeamStatistics teamId={currentTeamId} selectedLeague={selectedLeague} />
      </div>
    </>
  );
};

export default TeamInfo;
