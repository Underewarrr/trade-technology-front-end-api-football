import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../../hoc/component/ProtectedRoute';
import TeamStatistics from './TeamStatistics';
import { Card, Image } from 'react-bootstrap';
import PlayerList from './PlayersList';
import PlayqerSquad from './PlayqerSquad';

const TeamInfo = () => {
  const [teamInfo, setTeamInfo] = useState({});
  const [selectedLeague, setSelectedLeague] = useState('');

  const currentTeamId = parseInt(localStorage.getItem('currentTeam'));
  const leagueId = localStorage.getItem('selectedLeague');
  const season = localStorage.getItem('selectedSeason');

  useEffect(() => {
    const teamsData = localStorage.getItem(`teams-${selectedLeague}`);
    console.log("Team information found in localstorage", teamsData)
    if (teamsData) {
      const teams = JSON.parse(teamsData);
      const currentTeam = teams.find((team) => team.team.id === currentTeamId);
      if (currentTeam) {
        setTeamInfo(currentTeam.team);
        localStorage.setItem('currentTeamName', currentTeam.team.name); // Save the team name to local storage
      }
    }
  }, [currentTeamId, selectedLeague]);

  useEffect(() => {
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
            <Image src={teamInfo.logo} alt={teamInfo.name} width={128} height={128} rounded />
          </Card.Body>
        </Card>
      </div>
      <div>
        <TeamStatistics teamId={currentTeamId} selectedLeague={selectedLeague} />
        {/*
        Filter all players from seasons and league
        <PlayerList leagueId={leagueId} season={season} /> */}
        <PlayqerSquad teamId={currentTeamId} />
      </div>
    </>
  );
};

export default TeamInfo;
