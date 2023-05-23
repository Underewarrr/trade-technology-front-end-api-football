  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Card from 'react-bootstrap/Card';
  import ListGroup from 'react-bootstrap/ListGroup';

  const Countries = () => {
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
  const storedCountries = localStorage.getItem('countries');
      if (storedCountries) {
        setCountries(JSON.parse(storedCountries));
      } else {
  const apiKey = localStorage.getItem('apiKey');
  const response = await axios.get('https://v3.football.api-sports.io/countries', {
    headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': apiKey || '',
    },
    });
    setCountries(response.data.response);
    console.log(response)
    localStorage.setItem('countries', JSON.stringify(response.data.response));
    }
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
    <Card>
    <ListGroup variant="flush">
    {countries.map((country) => (
    <ListGroup.Item key={country.id}>
    {country.name}
    {/* <img src={country.flag} alt={${country.name} Flag} /> */}
    </ListGroup.Item>
    ))}
    </ListGroup>
    </Card>
    </div>
    );
    };

  export default Countries;