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

export const getVehicle = async (id: string) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const getSpecies = async (id: string) => {
  const response = await api.get(`/species/${id}`);
  return response.data;
};

export const getFilm = async (id: string) => {
  const response = await api.get(`/films/${id}`);
  return response.data;
};

export const getPlanet = async (id: string) => {
  const response = await api.get(`/planets/${id}`);
  return response.data;
};