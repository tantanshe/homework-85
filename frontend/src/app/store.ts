import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../features/artists/artistsSlice';
import {albumsReducer} from '../features/albums/albumsSlice'
import {tracksReducer} from '../features/tracks/tracksSlice'
import {usersReducer} from '../features/users/usersSlice';
import {trackHistoryReducer} from '../features/trackHistory/trackHistorySlice';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;