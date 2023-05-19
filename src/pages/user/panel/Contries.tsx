import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = () => {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = localStorage.getItem('apiKey');
        const response = await axios.get('https://v3.football.api-sports.io/countries', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey || '',
          },
        });
        setCountries(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (countries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            {country.name}
            <img src={country.flag} alt={`${country.name} Flag`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
