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

export const fetchAlbumById = createAsyncThunk<Album, string>(
  'albums/fetchAlbumById',
  async (albumId) => {
    const response = await axiosApi.get(`/albums/${albumId}`);
    return response.data;
  }
);

export const addAlbum = createAsyncThunk<Album, Album>(
  'albums/addAlbum',
  async (albumData) => {
    const response = await axiosApi.post('/albums', albumData);
    return response.data;
  }
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteAlbum',
  async (albumId) => {
    await axiosApi.delete(`/albums/${albumId}`);
  }
);

export const updateAlbum = createAsyncThunk<Album, string>(
  'albums/updateAlbum',
  async (albumId) => {
    const response = await axiosApi.patch(`/albums/${albumId}/togglePublished`);
    return response.data;
  }
);