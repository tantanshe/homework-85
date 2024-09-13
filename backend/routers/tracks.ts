import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import {TrackMutation} from '../types';

const tracksRouter = express.Router();

tracksRouter.get('/tracks', async (req, res, next) => {
  try {
    const albumId = req.query.album;
    const query = albumId ? {album: albumId} : {};
    const tracks = await Track.find(query).sort({trackNumber: 1});
    res.json(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/tracks', async (req, res, next) => {
  try {
    const trackMutation: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      trackNumber: req.body.trackNumber,
    };

    const isAlbum = await Album.findById(trackMutation.album);
    if (!isAlbum) {
      return res.status(400).json({error: 'Album is not found'});
    }

    const track = new Track(trackMutation);
    await track.save();

    return res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default tracksRouter;
