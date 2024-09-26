import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtists, selectIsArtistsLoading, selectArtistsError} from './artistsSlice';
import {deleteArtist, fetchArtists, updateArtist} from './artistsThunks';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Box
} from '@mui/material';
import {Link, Navigate} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {selectUser} from '../users/usersSlice';
import {ImageNotSupported} from '@mui/icons-material';

const ArtistsPage: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectIsArtistsLoading);
  const error = useAppSelector(selectArtistsError);
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) return <CircularProgress/>;
  if (error) return <Alert severity="error">Error loading artists</Alert>;

  const handleDelete = (artistId: string) => {
    dispatch(deleteArtist(artistId));
    dispatch(fetchArtists());
  };

  const handlePublish = (artistId: string) => {
    dispatch(updateArtist(artistId));
  };

  return (
    <>
      {user ? (
        <Grid container spacing={2} justifyContent="center">
          {artists.map((artist) => (
            <Grid item key={artist._id} xs={12} sm={6} md={4} lg={3} sx={{mt: 4}}>
              <Card style={{width: '100%'}}>
                <Link to={`/artists/${artist._id}`} style={{textDecoration: 'none'}}>
                  {artist.photo ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={`http://localhost:8000/${artist.photo}`}
                      alt={artist.name}
                      style={{objectFit: 'cover'}}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey',
                      }}
                    >
                      <ImageNotSupported fontSize="large" color="disabled"/>
                    </Box>
                  )}
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {artist.name}
                    </Typography>
                  </CardContent>
                </Link>
                <CardContent>
                  {!artist.isPublished && (
                    <Typography variant="body2" color="error" sx={{mt: 1}}>
                      Unpublished
                    </Typography>
                  )}
                  {artist._id && isAdmin && (
                    <>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(artist._id)}>
                        Delete
                      </Button>
                      {!artist.isPublished && (
                        <Button variant="contained" color="primary" onClick={() => handlePublish(artist._id)}>
                          Publish
                        </Button>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Navigate to="/register"/>
      )}
    </>
  );
};

export default ArtistsPage;
