import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album} from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAlbums',
  async (artistId) => {
    const response = await axiosApi.get(`/albums?artist=${artistId}`);
    return response.data;
  }
);
