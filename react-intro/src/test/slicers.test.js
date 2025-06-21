import React from 'react';
import '@testing-library/jest-dom';

import libraryReducer, { addSong, removeSong } from '../redux/slicers/librarySlice';
import searchReducer, { resetResults } from '../redux/slicers/searchSlice';


// Tests for the librarySlice
describe('librarySlice', () => {
  const initialState = [];

  const mockSong = {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    img: 'cover1.jpg',
    year: '1975',
    genre: 'Rock',
  };

  it('should return the initial state', () => {
    expect(libraryReducer(undefined, { type: undefined })).toEqual([]);
  });

  it('should handle addSong', () => {
    const nextState = libraryReducer(initialState, addSong(mockSong));
    expect(nextState).toEqual([mockSong]);
  });

  it('should handle removeSong', () => {
    const stateWithSong = [mockSong];
    const nextState = libraryReducer(stateWithSong, removeSong('1'));
    expect(nextState).toEqual([]);
  });

  it('should not remove if id does not exist', () => {
    const stateWithSong = [mockSong];
    const nextState = libraryReducer(stateWithSong, removeSong('2'));
    expect(nextState).toEqual([mockSong]);
  });
});


// Tests for the searchSlice
describe('searchSlice', () => {
  const initialState = {
    results: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(searchReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle resetResults', () => {
    const state = {
      results: [{ id: '1', title: 'Test' }],
      loading: true,
      error: 'Some error',
    };
    const nextState = searchReducer(state, resetResults());
    expect(nextState).toEqual(initialState);
  });

  it('should handle fetchAlbums.pending', () => {
    const action = { type: 'search/fetchAlbums/pending' };
    const nextState = searchReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchAlbums.fulfilled', () => {
    const albums = [{ id: '1', title: 'Test' }];
    const action = { type: 'search/fetchAlbums/fulfilled', payload: albums };
    const nextState = searchReducer(initialState, action);
    expect(nextState.results).toEqual(albums);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchAlbums.rejected', () => {
    const action = { type: 'search/fetchAlbums/rejected', payload: 'Error!' };
    const nextState = searchReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Error!');
  });
});