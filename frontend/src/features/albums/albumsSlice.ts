import {createSlice} from '@reduxjs/toolkit';
import {addAlbum, deleteAlbum, fetchAlbumById, fetchAlbums, updateAlbum} from './albumsThunks';
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

    builder
      .addCase(addAlbum.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addAlbum.fulfilled, (state, action) => {
        state.albums.push(action.payload);
        state.loading = false;
      })
      .addCase(addAlbum.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(deleteAlbum.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(album => album._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(updateAlbum.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.albums.findIndex(album => album._id === action.payload._id);
        if (index !== -1) {
          state.albums[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateAlbum.rejected, (state) => {
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
