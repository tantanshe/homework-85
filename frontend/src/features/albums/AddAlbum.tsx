import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import {useNavigate, Navigate} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addAlbum} from './albumsThunks';
import {Album} from '../../types';
import {selectUser} from '../users/usersSlice';
import {selectArtists as selectAllArtists} from '../artists/artistsSlice';
import FileInput from '../../UI/FileInput/FileInput';
import {fetchArtists} from '../artists/artistsThunks';

const AddAlbum: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const artists = useAppSelector(selectAllArtists);

  const [state, setState] = useState<Album>({
    artistId: '',
    name: '',
    photo: null,
    year: 0,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !state.artistId) return;

    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('artist', state.artistId);
    formData.append('year', String(state.year));
    if (state.photo) {
      formData.append('photo', state.photo);
    }

    dispatch(addAlbum(formData))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Failed to add album:', error);
      });
  };

  return (
    <>
      {user ? (
        <div>
          <Typography variant="h4">Add New Album</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={state.name}
              onChange={(e) => setState({...state, name: e.target.value})}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Artist</InputLabel>
              <Select
                value={state.artistId}
                onChange={(e) => setState({...state, artistId: e.target.value})}
              >
                {artists.map((artist) => (
                  <MenuItem key={artist._id} value={artist._id}>
                    {artist.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Release Year"
              type="number"
              value={state.year || ''}
              onChange={(e) => setState({...state, year: Number(e.target.value)})}
              fullWidth
              margin="normal"
              required
            />
            <FileInput
              onChange={fileInputChangeHandler}
              name="photo"
              label="Upload Cover"
            />
            <Button sx={{mt: 2}} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Navigate to="/login"/>
      )}
    </>
  );
};

export default AddAlbum;
