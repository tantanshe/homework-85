import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtists, selectIsArtistsLoading, selectArtistsError} from './artistsSlice';
import {fetchArtists} from './artistsThunks';
import {Card, CardContent, CardMedia, Typography, CircularProgress, Alert, Grid} from '@mui/material';
import {Link} from 'react-router-dom';
import {AppDispatch} from '../../app/store';

const ArtistsPage: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectIsArtistsLoading);
  const error = useAppSelector(selectArtistsError);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) return <CircularProgress/>;
  if (error) return <Alert severity="error">Error loading artists</Alert>;

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {artists.map((artist) => (
          <Grid item key={artist._id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{width: '100%'}}>
              <Link to={`/artists/${artist._id}`}>
                <CardMedia
                  component="img"
                  height="300"
                  image={`http://localhost:8000/${artist.photo}`}
                  alt={artist.name}
                  style={{objectFit: 'cover'}}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {artist.name}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ArtistsPage;
