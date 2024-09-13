import {createSlice} from '@reduxjs/toolkit';
import {fetchArtists} from './artistsThunks';
import {Artist} from '../../types';
import {RootState} from '../../app/store';

interface ArtistsState {
  artists: Artist[];
  loading: boolean;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
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
  },
});

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectIsArtistsLoading = (state: RootState) => state.artists.loading;
export const selectArtistsError = (state: RootState) => state.artists.error;

export default artistsSlice.reducer;
