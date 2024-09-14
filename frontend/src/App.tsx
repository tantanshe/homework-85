import './App.css';
import AlbumsPage from './features/albums/AlbumsPage';
import {Container, Typography} from '@mui/material';
import ArtistsPage from './features/artists/ArtistsPage';
import TracksPage from './features/tracks/TracksPage';
import {Route, Routes} from 'react-router-dom';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="lg" component="main">
        <Routes>
          <Route path="/" element={<ArtistsPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/artists/:artistId" element={<AlbumsPage/>}/>
          <Route path="/artists/:artistId/albums/:albumId/tracks" element={<TracksPage/>}/>
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;