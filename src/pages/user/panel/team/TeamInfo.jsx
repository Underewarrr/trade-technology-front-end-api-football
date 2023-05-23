import React, { useEffect, useState } from 'react';

const TeamInfo = () => {
  const [teamInfo, setTeamInfo] = useState({});

  useEffect(() => {
    // Fetch and set the team information from localStorage
    const currentTeam = localStorage.getItem('currentTeam');
    if (currentTeam) {
      setTeamInfo(JSON.parse(currentTeam));
    }
  }, []);

  return (
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
  );
};

export default TeamInfo;
