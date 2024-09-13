import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectAlbums, selectIsAlbumsLoading, selectAlbumsError} from './albumsSlice';
import {fetchAlbums} from './albumsThunks';
import {Card, CardContent, CardMedia, Typography, CircularProgress, Alert, Grid} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {selectArtist, selectArtistError, selectIsArtistLoading} from '../artists/artistsSlice';
import {fetchArtistById} from '../artists/artistsThunks';

const AlbumsPage: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const {artistId} = useParams<{ artistId: string }>();

  const albums = useAppSelector(selectAlbums);
  const loadingAlbums = useAppSelector(selectIsAlbumsLoading);
  const error = useAppSelector(selectAlbumsError);
  const artist = useAppSelector((state) => selectArtist(state));
  const loadingArtist = useAppSelector(selectIsArtistLoading);
  const errorArtist = useAppSelector(selectArtistError);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
      dispatch(fetchArtistById(artistId));
    }
  }, [dispatch, artistId]);

  if (loadingAlbums || loadingArtist) return <CircularProgress/>;
  if (error) return <Alert severity="error">Error loading albums</Alert>;
  if (errorArtist) return <Alert severity="error">Error loading artist</Alert>;

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        {artist && (
          <Grid item>
            <Typography variant="h4" gutterBottom align="center">
              {artist.name}
            </Typography>
          </Grid>
        )}
        <Grid item container spacing={2} justifyContent="center">
          {albums.map((album) => (
            <Grid item key={album._id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{width: '100%'}}>
                <Link to={`/artists/${artistId}/albums/${album._id}/tracks`}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`http://localhost:8000/${album.photo}`}
                    alt={album.name}
                    style={{objectFit: 'cover'}}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {album.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Year of release: {album.year}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default AlbumsPage;
