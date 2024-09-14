import {AppBar, Button, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link, NavLink} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/users/usersSlice';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  }
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              <StyledLink to="/">Music App</StyledLink>
            </Typography>
          </Grid>
          {user ? (
            <Grid item>
              <Typography>
              User is logged in
              </Typography>
            </Grid>
            ) : (
            <Grid item>
              <Button component={NavLink} to="/register" color="inherit">
                Sign up
              </Button>
              <Button component={NavLink} to="/login" color="inherit">
                Sign in
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;