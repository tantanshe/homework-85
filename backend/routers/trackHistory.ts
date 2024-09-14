import express from 'express';
import TrackHistory from '../models/TrackHistory';
import User from '../models/User';
import Track from '../models/Track';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/track_history', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    if (!headerValue) {
      return res.status(401).send({error: 'Header "Authorization" not found'});
    }
    const [_bearer, token] = headerValue.split(' ');
    if (!token) {
      return res.status(401).send({error: 'No token present'});
    }
    const user = await User.findOne({token});
    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }

    const { track } = req.body;
    if (!track) {
      return res.status(400).send({ error: 'Track ID is required' });
    }

    const trackExists = await Track.exists({ _id: track });
    if (!trackExists) {
      return res.status(400).send({ error: 'Track not found' });
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: track,
      date: new Date(),
    });

    await trackHistory.save();
    res.send(trackHistory);
  } catch (error) {
    return next(error);
  }
});

trackHistoryRouter.get('/track_history', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    if (!headerValue) {
      return res.status(401).send({error: 'Header "Authorization" not found'});
    }
    const [_bearer, token] = headerValue.split(' ');
    if (!token) {
      return res.status(401).send({error: 'No token present'});
    }
    const user = await User.findOne({token});
    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }
    const trackHistory = await TrackHistory.find({ user: user._id })
      .populate({
        path: 'track',
        populate: {
          path: 'album',
          populate: {
            path: 'artist',
          },
        },
      }).sort({datetime: -1});
    return res.send(trackHistory);
  } catch (error) {
    next(error);
  }
});


export default trackHistoryRouter;
