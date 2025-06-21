import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asyn Thunk to fetch albums by artist name
export const fetchAlbums = createAsyncThunk(
  'search/fetchAlbums',
  async (artistName, thunkAPI) => {
    try {
      // 1. Search the artist by name
      const artistResponse = await fetch(
        `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistName)}&fmt=json`
      );
      if (!artistResponse.ok) {
        throw new Error(`HTTP error! status: ${artistResponse.status}`);
      }
      const artistData = await artistResponse.json();

      if (!artistData.artists || artistData.artists.length === 0) {
        return thunkAPI.rejectWithValue(`No se encontró ningún artista con el nombre "${artistName}".`);
      }

      const artistId = artistData.artists[0].id;

      // 2. Search for artist albums
      const albumResponse = await fetch(
        `https://musicbrainz.org/ws/2/release-group?artist=${artistId}&type=album&fmt=json`
      );
      if (!albumResponse.ok) {
        throw new Error(`HTTP error! status: ${albumResponse.status}`);
      }
      const albumData = await albumResponse.json();

      // 3. Obtains album covers
      if (albumData['release-groups']) {
        const albumsWithCovers = await Promise.all(
          albumData['release-groups'].map(async (album) => {
            const coverArtUrl = `https://coverartarchive.org/release-group/${album.id}/front`;
            try {
              const coverResponse = await fetch(coverArtUrl);
              if (coverResponse.ok) {
                album.coverArt = coverArtUrl;
              } else {
                album.coverArt = null;
              }
            } catch {
              album.coverArt = null;
            }
            return album;
          })
        );
        return albumsWithCovers;
      } else {
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetResults: (state) => {
      state.results = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching albums';
      });
  },
});

export const { resetResults } = searchSlice.actions;
export default searchSlice.reducer;