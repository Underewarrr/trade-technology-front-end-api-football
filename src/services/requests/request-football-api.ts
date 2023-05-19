import axios from 'axios';

const api = axios.create({
  baseURL: 'https://v3.football.api-sports.io/',
});
/* 
const validApiKeys = ['d3c258a7012e5b79d32effc31c362f4f', 'your-valid-api-key-2']; // Adicione aqui as chaves válidas

export const setKey = (apiKey: string) => {
  if (validApiKeys.includes(apiKey)) {
    api.defaults.headers.common['x-rapidapi-key'] = apiKey;
  } else {
    throw new Error('Invalid API Key');
  }
}; */

const validApiKeys = ['d3c258a7012e5b79d32effc31c362f4f']; // Adicione aqui as chaves válidas

export const setKey = (apiKey: string) => {
  if (validApiKeys.includes(apiKey)) {
    api.defaults.headers.common['x-rapidapi-host'] = 'v3.football.api-sports.io';
    api.defaults.headers.common['x-rapidapi-key'] = `d3c258a7012e5b79d32effc31c362f4f`;
  } else {
    throw new Error('Invalid API Key');
  }
};

export const getCountries = async () => {
  try {
    const { data } = await api.get('/countries');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default api;
