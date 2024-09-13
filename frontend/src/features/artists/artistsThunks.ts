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