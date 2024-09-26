import * as express from 'express';
import mongoose from 'mongoose';
import Album from '../models/Album';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {AlbumMutation} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    const query = artistId ? {artist: artistId} : {};
    const albums = await Album.find(query).sort({year: -1});
    res.json(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('photo'), async (req: RequestWithUser, res, next) => {
  try {
    const albumMutation: AlbumMutation = {
      name: req.body.name,
      artist: req.body.artist,
      year: req.body.year,
      photo: req.file ? req.file.path : null,
    };

    const isArtist = await Artist.findById(albumMutation.artist);
    if (!isArtist) {
      return res.status(400).json({error: 'Invalid artist ID'});
    }

    const album = new Album(albumMutation);
    await album.save();

    return res.send(album);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');
    if (!album) {
      return res.status(404).json({error: 'Album not found'});
    }
    res.json(album);
  } catch (error) {
    next(error);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    await Album.deleteOne({_id: req.params.id});

    res.send({message: 'Album deleted successfully'});
  } catch (error) {
    next(error);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({error: 'Album not found'});
    }

    album.isPublished = !album.isPublished;
    await album.save();

    res.json(album);
  } catch (error) {
    next(error);
  }
});

export default albumsRouter;
