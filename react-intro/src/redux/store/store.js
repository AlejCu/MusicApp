import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from '../slicers/librarySlice';
import searchReducer from '../slicers/searchSlice';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    search: searchReducer,
  },
});