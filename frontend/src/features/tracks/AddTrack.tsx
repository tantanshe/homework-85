import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import {useNavigate, Navigate} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addTrack} from './tracksThunks';
import {Track} from '../../types';
import {selectUser} from '../users/usersSlice';
import {selectAlbums} from '../albums/albumsSlice';
import {fetchAlbums} from '../albums/albumsThunks';

const AddTrack: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const albums = useAppSelector(selectAlbums);

  const [state, setState] = useState<Track>({
    albumId: '',
    trackNumber: 0,
    name: '',
    duration: '',
  });

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name || !state.albumId) return;

    dispatch(addTrack(state))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Failed to add track:', error);
      });
  };

  return (
    <>
      {user ? (
        <div>
          <Typography variant="h4">Add New Track</Typography>
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
              <InputLabel>Album</InputLabel>
              <Select
                value={state.albumId}
                onChange={(e) => setState({...state, albumId: e.target.value})}
              >
                {albums.map((album) => (
                  <MenuItem key={album._id} value={album._id}>
                    {album.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Track Number"
              type="number"
              value={state.trackNumber || ''}
              onChange={(e) => setState({...state, trackNumber: Number(e.target.value)})}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Duration"
              value={state.duration}
              onChange={(e) => setState({...state, duration: e.target.value})}
              fullWidth
              margin="normal"
              required
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

export default AddTrack;
