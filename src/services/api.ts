import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://swapi.dev/api'
});

export const getCharacters = async (page = 1) => {
  const response = await api.get(`/people/?page=${page}`);
  return response.data;
};

export const getCharacter = async (id: string) => {
  const response = await api.get(`/people/${id}`);
  return response.data;
};

export const getStarship = async (id: string) => {
    const response = await api.get(`/starships/${id}`);
    return response.data;
  };