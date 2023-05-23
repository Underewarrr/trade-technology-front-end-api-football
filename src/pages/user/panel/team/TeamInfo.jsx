import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import TeamStatistics from './TeamStatistics';

// To use as props pass as parameter { currentTeamId } and receive in componenet.
const TeamInfo = () => {
  const [teamInfo, setTeamInfo] = useState({});

  const currentTeamId = parseInt(localStorage.getItem('currentTeam'));
    console.log('currentTeamID', currentTeamId)

  useEffect(() => {
    // Fetch and set the team information from localStorage
    const teamsData = localStorage.getItem(`teams-73`); // Replace '73' with the appropriate league ID
    console.log(teamsData)
    if (teamsData) {
      const teams = JSON.parse(teamsData);
        console.log('teams', teams)
      const currentTeam = teams.find((team) => team.team.id === currentTeamId);
      if (currentTeam) {
        setTeamInfo(currentTeam.team);
      }
    }
  }, [currentTeamId]);

  return (
    <><Header />
    <div>
          <h1>Team Information</h1>
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">Team Name</h5>
                  <p className="card-text">{teamInfo.name}</p>
              </div>
          </div>
          <div className="card">
              <div className="card-body">
                  <h5 className="card-title">Country</h5>
                  <p className="card-text">{teamInfo.country}</p>
              </div>
          </div>
          {/* Add more card components for additional team information */}
      </div>
      <div>
        <TeamStatistics />
      </div>
      </>
  );
};

export default TeamInfo;
