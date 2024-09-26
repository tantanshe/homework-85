import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const query = req.user?.role === 'admin' ? {} : { isPublished: true };
    const artists = await Artist.find(query);
    res.json(artists);
  } catch (error) {
    next(error);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).send('Artist not found');
    }
    res.json(artist);
  } catch (error) {
    next(error);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('photo'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }
    const artistMutation: ArtistMutation = {
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      info: req.body.info,
      isPublished: false,
    };

    const artist = new Artist(artistMutation);
    await artist.save();

    return res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }
    await Artist.deleteOne({_id: req.params.id});

    res.send({message: 'Artist deleted successfully'});
  } catch (error) {
    next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({error: 'Artist not found'});
    }

    artist.isPublished = !artist.isPublished;
    await artist.save();

    res.json(artist);
  } catch (error) {
    next(error);
  }
});

export default artistsRouter;