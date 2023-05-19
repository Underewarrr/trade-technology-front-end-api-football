import axios from 'axios';

const api = axios.create({
  baseURL: 'https://v3.football.api-sports.io/',
});

const validApiKeys = ['your-valid-api-key-1', 'your-valid-api-key-2']; // Adicione aqui as chaves válidas

export const setKey = (apiKey: string) => {
  if (validApiKeys.includes(apiKey)) {
    api.defaults.headers.common['x-rapidapi-key'] = apiKey;
  } else {
    throw new Error('Invalid API Key');
  }
};

export const requestData = async (endpoint: string) => {
  try {
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendData = async (endpoint: string, body: any) => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default api;
