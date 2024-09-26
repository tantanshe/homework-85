import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import {TrackMutation} from '../types';
import Artist from '../models/Artist';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;
    const query = albumId ? {album: albumId} : {};
    const tracks = await Track.find(query).populate('album').sort({trackNumber: 1});
    res.json(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const track = await Track.findById(id).populate({
      path: 'album',
      populate: {
        path: 'artist',
        model: Artist,
      },
    });

    if (!track) {
      return res.status(404).json({error: 'Track not found'});
    }

    res.json({track});
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackMutation: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      trackNumber: req.body.trackNumber,
      isPublished: false,
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

tracksRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    await Track.deleteOne({_id: req.params.id});

    res.send({message: 'Track deleted successfully'});
  } catch (error) {
    next(error);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).json({error: 'Track not found'});
    }

    track.isPublished = !track.isPublished;
    await track.save();

    res.json(track);
  } catch (error) {
    next(error);
  }
});


export default tracksRouter;
