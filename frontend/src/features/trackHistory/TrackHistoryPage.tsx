import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchTrackHistory} from './trackHistoryThunks';
import {selectTrackHistory, selectHistoryError, selectIsHistoryLoading} from './trackHistorySlice';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {selectUser} from '../users/usersSlice';

const TrackHistoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);
  const loading = useAppSelector(selectIsHistoryLoading);
  const error = useAppSelector(selectHistoryError);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  if (loading) return <CircularProgress/>;
  if (error) return <Alert severity="error">Error fetching track history</Alert>;

  return (
    <>
      {user ? (
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Track History
          </Typography>
          {trackHistory.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No tracks in history yet.
            </Typography>
          ) : (
            <List>
              {trackHistory.map((item) => (
                <ListItem key={item._id}>
                  <Paper
                    elevation={3}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      marginBottom: '8px',
                      backgroundColor: '#d8e2e4',
                    }}
                  >
                    <ListItemText
                      primary={`${item.track?.album?.artist?.name || 'Unknown Artist'} - ${
                        item.track?.name || 'Unknown Track'
                      }`}
                      secondary={`Listened on: ${new Date(item.datetime).toLocaleString()}`}
                    />
                  </Paper>
                </ListItem>
              ))}
            </List>
          )}
        </Stack>
      ) : (
        <Navigate to="/login"/>
      )}
    </>
  );
};

export default TrackHistoryPage;
