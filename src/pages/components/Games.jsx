import React, { useState } from 'react';

const Games = () => {
  const apiKey = localStorage.getItem('apiKey'); // Retrieve API key from localStorage

  const [selectedSeason, setSelectedSeason] = useState('');

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <div>
      <h2>Games</h2>
      <div
        id="wg-api-football-games"
        data-host="v3.football.api-sports.io"
        data-key={apiKey}
        data-refresh={15} // Update frequency in seconds
        data-date=""
        data-league=""
        data-season={selectedSeason} // Set the selected season
        data-theme=""
        data-show-toolbar="true"
        data-show-logos="true"
        data-modal-game="true"
        data-modal-standings="true"
        data-modal-show-logos="true"
        data-show-errors="false"
      ></div>
      <script
        type="module"
        src="https://widgets.api-sports.io/2.0.3/widgets.js"
      ></script>
    </div>
  );
};

export default Games;
