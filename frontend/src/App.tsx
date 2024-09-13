import './App.css';
import AlbumsPage from './features/albums/AlbumsPage';
import {Container} from '@mui/material';
import ArtistsPage from './features/artists/ArtistsPage';
import TracksPage from './features/tracks/TracksPage';
import {Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<ArtistsPage/>}/>
        <Route path="/artists/:artistId" element={<AlbumsPage/>}/>
        <Route path="/artists/:artistId/albums/:albumId/tracks" element={<TracksPage/>}/>
      </Routes>
    </Container>
  );
};

export default App;