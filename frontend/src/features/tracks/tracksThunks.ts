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

export const updateTrack = createAsyncThunk<Track, string>(
  'tracks/updateTrack',
  async (trackId) => {
    const response = await axiosApi.patch(`/tracks/${trackId}/togglePublished`);
    return response.data;
  }
);