import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getCharacter, 
  getStarship, 
  getVehicle, 
  getSpecies, 
  getFilm, 
  getPlanet 
} from '../services/api';
import { Character, Film, Planet, Species, Starship, Vehicle } from '../pages/CharacterDetail/types';

interface CharacterDetailState {
  character: Character | null;
  homeworld: Planet | null;
  films: { [key: string]: Film };
  species: { [key: string]: Species };
  vehicles: { [key: string]: Vehicle };
  starships: { [key: string]: Starship };
  loading: boolean;
  error: string | null;
}

const initialState: CharacterDetailState = {
  character: null,
  homeworld: null,
  films: {},
  species: {},
  vehicles: {},
  starships: {},
  loading: true,
  error: null,
};

export const fetchCharacterDetails = createAsyncThunk(
  'characterDetail/fetchCharacterDetails',
  async (id: string) => {
    const character = await getCharacter(id);
    
    let homeworld = null;
    if (character.homeworld) {
      const planetId = character.homeworld.split('/').filter(Boolean).pop();
      if (planetId) {
        homeworld = await getPlanet(planetId);
      }
    }
    
    const films: { [key: string]: Film } = {};
    if (character.films && character.films.length > 0) {
      await Promise.all(
        character.films.map(async (filmUrl: string) => {
          const filmId = filmUrl.split('/').filter(Boolean).pop();
          if (filmId) {
            try {
              const filmData = await getFilm(filmId);
              films[filmUrl] = filmData;
            } catch (error) {
              console.error(`Erro ao buscar filme ${filmId}:`, error);
            }
          }
        })
      );
    }
    
    const species: { [key: string]: Species } = {};
    if (character.species && character.species.length > 0) {
      await Promise.all(
        character.species.map(async (speciesUrl: string) => {
          const speciesId = speciesUrl.split('/').filter(Boolean).pop();
          if (speciesId) {
            try {
              const speciesData = await getSpecies(speciesId);
              species[speciesUrl] = speciesData;
            } catch (error) {
              console.error(`Erro ao buscar espécie ${speciesId}:`, error);
            }
          }
        })
      );
    }
    
    const vehicles: { [key: string]: Vehicle } = {};
    if (character.vehicles && character.vehicles.length > 0) {
      await Promise.all(
        character.vehicles.map(async (vehicleUrl: string) => {
          const vehicleId = vehicleUrl.split('/').filter(Boolean).pop();
          if (vehicleId) {
            try {
              const vehicleData = await getVehicle(vehicleId);
              vehicles[vehicleUrl] = vehicleData;
            } catch (error) {
              console.error(`Erro ao buscar veículo ${vehicleId}:`, error);
            }
          }
        })
      );
    }
    
    const starships: { [key: string]: Starship } = {};
    if (character.starships && character.starships.length > 0) {
      await Promise.all(
        character.starships.map(async (starshipUrl: string) => {
          const starshipId = starshipUrl.split('/').filter(Boolean).pop();
          if (starshipId) {
            try {
              const starshipData = await getStarship(starshipId);
              starships[starshipUrl] = starshipData;
            } catch (error) {
              console.error(`Erro ao buscar nave ${starshipId}:`, error);
            }
          }
        })
      );
    }
    
    return {
      character,
      homeworld,
      films,
      species,
      vehicles,
      starships
    };
  }
);

const characterDetailSlice = createSlice({
  name: 'characterDetail',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearCharacterDetail: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
        state.character = action.payload.character;
        state.homeworld = action.payload.homeworld;
        state.films = action.payload.films;
        state.species = action.payload.species;
        state.vehicles = action.payload.vehicles;
        state.starships = action.payload.starships;
        state.loading = false;
      })
      .addCase(fetchCharacterDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar detalhes do personagem';
      });
  },
});

export const { clearCharacterDetail } = characterDetailSlice.actions;
export default characterDetailSlice.reducer;