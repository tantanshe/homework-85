import express from 'express';
import TrackHistory from '../models/TrackHistory';
import User from '../models/User';

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
    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      date: new Date(),
    });

    await trackHistory.save();
    res.send(trackHistory);
  } catch (error) {
    return next(error);
  }
});

export default trackHistoryRouter;
