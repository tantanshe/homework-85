import {createSlice} from '@reduxjs/toolkit';
import {TrackInHistory} from '../../types';
import {fetchTrackHistory, addTrackToHistory} from './trackHistoryThunks';

interface TrackHistoryState {
  trackHistory: TrackInHistory[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TrackHistoryState = {
  trackHistory: [],
  isLoading: false,
  error: false,
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trackHistory = action.payload;
      })
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addTrackToHistory.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addTrackToHistory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addTrackToHistory.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectTrackHistory = (state: { trackHistory: TrackHistoryState }) => state.trackHistory.trackHistory;
export const selectIsHistoryLoading = (state: { trackHistory: TrackHistoryState }) => state.trackHistory.isLoading;
export const selectHistoryError = (state: { trackHistory: TrackHistoryState }) => state.trackHistory.error;

export const trackHistoryReducer = trackHistorySlice.reducer;
