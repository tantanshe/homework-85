import {createSlice} from '@reduxjs/toolkit';
import {fetchAlbumById, fetchAlbums} from './albumsThunks';
import {Album} from '../../types';
import {RootState} from '../../app/store';

interface AlbumsState {
  albums: Album[];
  album: Album | null;
  loading: boolean;
  error: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  album: null,
  loading: false,
  error: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(fetchAlbumById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.album = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlbumById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbum = (state: RootState) => state.albums.album;
export const selectIsAlbumsLoading = (state: RootState) => state.albums.loading;
export const selectIsAlbumLoading = (state: RootState) => state.albums.loading;
export const selectAlbumsError = (state: RootState) => state.albums.error;
export const selectAlbumError = (state: RootState) => state.albums.error;

export const albumsReducer = albumsSlice.reducer;
