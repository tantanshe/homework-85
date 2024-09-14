import React, {useState} from 'react';
import {RegisterMutation} from '../../types';
import {Avatar, Box, Button, Grid, TextField, Typography, Link} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink} from 'react-router-dom';

const Register = () => {
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Box sx={{
      mt: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Avatar sx={{
        m: 1,
        bgcolor: 'secondary.main',
      }}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              label="Username"
              name="username"
              autoComplete="new-username"
              value={state.username}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <Button type="submit" color="primary" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
          Sign up
        </Button>
        <Link component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
};

export default Register;