import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks} from './tracksThunks';
import {Track} from '../../types';
import {RootState} from '../../app/store';

interface TracksState {
  tracks: Track[];
  loading: boolean;
  error: boolean;
}

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectIsTracksLoading = (state: RootState) => state.tracks.loading;
export const selectTracksError = (state: RootState) => state.tracks.error;

export default tracksSlice.reducer;
