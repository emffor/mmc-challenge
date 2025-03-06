import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getCharacters } from '../services/api';
import { Character } from '../pages/Home/types';

interface CharactersState {
  data: Character[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  paginationLoading: boolean;
}

const initialState: CharactersState = {
  data: [],
  totalPages: 1,
  currentPage: 1,
  loading: true,
  error: null,
  paginationLoading: false,
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number) => {
    const response = await getCharacters(page);
    return response;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(fetchCharacters.pending, (state, action) => {
        if (state.loading) {
          state.loading = true;
        } else {
          state.paginationLoading = true;
        }
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.data = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 10);
        state.loading = false;
        state.paginationLoading = false;
        state.error = null;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.paginationLoading = false;
        state.error = action.error.message || 'Erro ao buscar personagens';
      });
  },
});

export const { setPage } = charactersSlice.actions;
export default charactersSlice.reducer;