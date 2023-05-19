import React, { useEffect, useState } from 'react';

const Seasons = () => {
  const [seasons, setSeasons] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = localStorage.getItem('apiKey');
        const headers = {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': apiKey || '', // Verifica se a apiKey existe e atribui uma string vazia caso seja nula
        };

        const response = await fetch('https://v3.football.api-sports.io/leagues/seasons', {
          method: 'GET',
          headers,
        });

        const data = await response.json();
        setSeasons(data.response);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Seasons</h1>
      <ul>
        {seasons.map((season) => (
          <li key={season}>{season}</li>
        ))}
      </ul>
    </div>
  );
};

export default Seasons;
