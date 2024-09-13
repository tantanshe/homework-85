import {createSlice} from '@reduxjs/toolkit';
import {fetchArtistById, fetchArtists} from './artistsThunks';
import {Artist} from '../../types';
import {RootState} from '../../app/store';

interface ArtistsState {
  artists: Artist[];
  artist: Artist | null;
  loading: boolean;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artist: null,
  loading: false,
  error: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.loading = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(fetchArtistById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        state.artist = action.payload;
        state.loading = false;
      })
      .addCase(fetchArtistById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtist = (state: RootState) => state.artists.artist;
export const selectIsArtistsLoading = (state: RootState) => state.artists.loading;
export const selectIsArtistLoading = (state: RootState) => state.artists.loading;
export const selectArtistsError = (state: RootState) => state.artists.error;
export const selectArtistError = (state: RootState) => state.artists.error;

export const artistsReducer = artistsSlice.reducer;
