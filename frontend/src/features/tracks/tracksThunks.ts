import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Track} from '../../types';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchTracks',
  async (albumId) => {
    const response = await axiosApi.get(`/tracks?album=${albumId}`);
    return response.data;
  }
);
