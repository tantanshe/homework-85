import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addArtist } from './artistsThunks';
import FileInput from '../../UI/FileInput/FileInput';
import { Artist } from '../../types';
import { selectUser } from '../users/usersSlice';

const AddArtist: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<Artist>({
    name: '',
    info: '',
    photo: null,
  });

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name) return;

    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('info', state.info);
    if (state.photo) {
      formData.append('photo', state.photo);
    }

    dispatch(addArtist(formData))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Failed to add artist:', error);
      });
  };

  return (
    <>
      {user ? (
        <div>
          <Typography variant="h4">Add New Artist</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Info"
              value={state.info}
              onChange={(e) => setState({ ...state, info: e.target.value })}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <FileInput
              onChange={fileInputChangeHandler}
              name="photo"
              label="Upload Photo"
            />
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default AddArtist;
