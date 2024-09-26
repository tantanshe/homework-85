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

export const addTrack = createAsyncThunk<Track, Track>(
  'tracks/addTrack',
  async (trackData) => {
    const response = await axiosApi.post('/tracks', trackData);
    return response.data;
  }
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/deleteTrack',
  async (trackId) => {
    await axiosApi.delete(`/tracks/${trackId}`);
  }
);

export const updateTrack = createAsyncThunk<Track, Track>(
  'tracks/updateTrack',
  async (trackData) => {
    const response = await axiosApi.patch(`/tracks/${trackData._id}`, trackData);
    return response.data;
  }
);