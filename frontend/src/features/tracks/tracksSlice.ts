import {createSlice} from '@reduxjs/toolkit';
import {addTrack, deleteTrack, fetchTracks, updateTrack} from './tracksThunks';
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

    builder
      .addCase(addTrack.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTrack.fulfilled, (state, action) => {
        state.tracks.push(action.payload);
        state.loading = false;
      })
      .addCase(addTrack.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(deleteTrack.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTrack.fulfilled, (state, action) => {
        state.tracks = state.tracks.filter(track => track._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(updateTrack.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateTrack.fulfilled, (state, action) => {
        const index = state.tracks.findIndex(track => track._id === action.payload._id);
        if (index !== -1) {
          state.tracks[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateTrack.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectIsTracksLoading = (state: RootState) => state.tracks.loading;
export const selectTracksError = (state: RootState) => state.tracks.error;

export const tracksReducer = tracksSlice.reducer;
