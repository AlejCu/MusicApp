import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const searchSlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addSong: (state, action) => {
      
      if (!state.some(song => song.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeSong: (state, action) => {
      return state.filter(song => song.id !== action.payload);
    },
  },
});

export const { addSong, removeSong } = searchSlice.actions;
export default searchSlice.reducer;