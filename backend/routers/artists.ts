import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import {imagesUpload} from '../multer';
import {ArtistMutation} from '../types';


const artistsRouter = express.Router();

artistsRouter.get('/artists', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    next(error);
  }
});

artistsRouter.get('/artists/:id', async (req, res, next) => {
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

artistsRouter.post('/artists', imagesUpload.single('photo'), async (req, res, next) => {
  try {
    const artistMutation: ArtistMutation = {
      name: req.body.name,
      photo: req.file ? req.file.path : null,
      info: req.body.info,
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

export default artistsRouter;