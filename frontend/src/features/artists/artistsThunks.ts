import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Artist} from '../../types';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchArtists',
  async () => {
    const response = await axiosApi.get('/artists');
    return response.data;
  }
);

export const fetchArtistById = createAsyncThunk<Artist, string>(
  'artists/fetchArtistById',
  async (artistId) => {
    const response = await axiosApi.get(`/artists/${artistId}`);
    return response.data;
  }
);

export const addArtist = createAsyncThunk<Artist, Artist>(
  'artists/addArtist',
  async (artistData) => {
    const response = await axiosApi.post('/artists', artistData);
    return response.data;
  }
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/deleteArtist',
  async (artistId) => {
    await axiosApi.delete(`/artists/${artistId}`);
  }
);

export const updateArtist = createAsyncThunk<Artist, string>(
  'artists/updateArtist',
  async (artistId) => {
    const response = await axiosApi.patch(`/artists/${artistId}/togglePublished`);
    return response.data;
  }
);