import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTracks, selectIsTracksLoading, selectTracksError} from './tracksSlice';
import {fetchTracks} from './tracksThunks';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Typography,
  Stack,
  Paper,
  IconButton
} from '@mui/material';
import {useParams} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {selectAlbum, selectAlbumError, selectIsAlbumLoading} from '../albums/albumsSlice';
import {selectArtist, selectArtistError, selectIsArtistLoading} from '../artists/artistsSlice';
import {fetchAlbumById} from '../albums/albumsThunks';
import {fetchArtistById} from '../artists/artistsThunks';
import {addTrackToHistory} from '../trackHistory/trackHistoryThunks';
import {selectUser} from '../users/usersSlice';
import {PlayArrow} from '@mui/icons-material';


const TracksPage: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const {artistId, albumId} = useParams<{ artistId: string, albumId: string }>();

  const tracks = useAppSelector(selectTracks);
  const loadingTracks = useAppSelector(selectIsTracksLoading);
  const errorTracks = useAppSelector(selectTracksError);
  const album = useAppSelector((state) => selectAlbum(state));
  const loadingAlbum = useAppSelector(selectIsAlbumLoading);
  const errorAlbum = useAppSelector(selectAlbumError);
  const artist = useAppSelector((state) => selectArtist(state));
  const loadingArtist = useAppSelector(selectIsArtistLoading);
  const errorArtist = useAppSelector(selectArtistError);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (artistId && albumId) {
      dispatch(fetchArtistById(artistId));
      dispatch(fetchAlbumById(albumId));
      dispatch(fetchTracks(albumId));
    }
  }, [dispatch, artistId, albumId]);

  const handlePlay = (trackId: string) => {
      dispatch(addTrackToHistory(trackId));
  };

  if (loadingTracks || loadingAlbum || loadingArtist) return <CircularProgress/>;
  if (errorTracks) return <Alert severity="error">Error loading tracks</Alert>;
  if (errorAlbum) return <Alert severity="error">Error loading albums</Alert>;
  if (errorArtist) return <Alert severity="error">Error loading artists</Alert>;

  return (
    <Stack spacing={2}>
      {artist && (
        <Typography variant="h4" gutterBottom>
          {artist.name}
        </Typography>
      )}
      {album && (
        <Typography variant="h5" gutterBottom>
          {album.name}
        </Typography>
      )}
      <List>
        {tracks.map((track) => (
          <ListItem key={track._id}>
            <Paper
              elevation={3}
              style={{
                width: '100%',
                padding: '8px 16px',
                marginBottom: '8px',
                backgroundColor: '#d8e2e4',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <ListItemText
                primary={`${track.trackNumber}. ${track.name}`}
                secondary={`Duration: ${track.duration}`}
              />
              {user && (
                <IconButton
                  color="primary"
                  onClick={() => handlePlay(track._id)}
                  sx={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #3f51b5',
                    borderRadius: '50%',
                    padding: '8px',
                    '&:hover': {
                      backgroundColor: '#a7b2df',
                    },
                  }}
                >
                  <PlayArrow />
                </IconButton>
              )}
            </Paper>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default TracksPage;
