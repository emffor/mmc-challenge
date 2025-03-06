import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import charactersReducer from './charactersSlice';
import characterDetailReducer from './characterDetailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: charactersReducer,
    characterDetail: characterDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;