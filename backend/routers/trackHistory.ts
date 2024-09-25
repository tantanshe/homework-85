import express from 'express';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';
import auth, {RequestWithUser} from '../middleware/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const {track} = req.body;
    if (!track) {
      return res.status(400).send({error: 'Track ID is required'});
    }

    const trackExists = await Track.exists({_id: track});
    if (!trackExists) {
      return res.status(400).send({error: 'Track not found'});
    }

    const trackHistory = new TrackHistory({
      user: req.user?._id,
      track: track,
      date: new Date(),
    });

    await trackHistory.save();
    res.send(trackHistory);
  } catch (error) {
    return next(error);
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistory = await TrackHistory.find({user: req.user?._id})
      .populate({
        path: 'track',
        populate: {
          path: 'album',
          populate: {
            path: 'artist',
          },
        },
      })
      .sort({datetime: -1});

    return res.send(trackHistory);
  } catch (error) {
    next(error);
  }
});


export default trackHistoryRouter;
