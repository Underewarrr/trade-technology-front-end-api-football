import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamDetails = () => {
  const [team, setTeam] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = localStorage.getItem('apiKey');
        const response = await axios.get('https://v3.football.api-sports.io/teams', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
          params: {
            id: 33,
          },
        });
        setTeam(response.data.response[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{team.team.name}</h1>
      <img src={team.team.logo} alt={`${team.team.name} Logo`} />
      <h2>Venue: {team.venue.name}</h2>
      <p>Address: {team.venue.address}</p>
      <p>City: {team.venue.city}</p>
      <p>Capacity: {team.venue.capacity}</p>
      <img src={team.venue.image} alt={`${team.venue.name} Image`} />
    </div>
  );
};

export default TeamDetails;
