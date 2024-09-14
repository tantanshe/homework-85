import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {TrackInHistory} from '../../types';

export const fetchTrackHistory = createAsyncThunk<TrackInHistory[], void, { state: RootState }>(
  'trackHistory/fetchTrackHistory',
  async (_, {getState, rejectWithValue}) => {
    const state = getState();
    const userToken = state.users.user?.token;

    if (!userToken) {
      return rejectWithValue('User is not authenticated');
    }

    try {
      const response = await axiosApi.get('/track_history', {headers: {'Authorization': `Bearer ${userToken}`}});
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching track history');
    }
  }
);

export const addTrackToHistory = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistory/addTrackToHistory',
  async (trackId, {getState, rejectWithValue}) => {
    const state = getState();
    const userToken = state.users.user?.token;

    if (!userToken) {
      return rejectWithValue('User is not authenticated');
    }

    try {
      await axiosApi.post('/track_history', { track: trackId }, {headers: {'Authorization': `Bearer ${userToken}`}});
    } catch (error) {
      return rejectWithValue('Error adding track to history');
    }
  }
);
