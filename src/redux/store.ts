import { configureStore } from '@reduxjs/toolkit';
import userReducer from './createSlice';

const store = configureStore({
  reducer: {
    register: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
