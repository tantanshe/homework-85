import express from 'express';
import mongoose from 'mongoose';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';
import usersRouter from './routers/users';
import trackHistoryRouter from './routers/trackHistory';
import cors, {CorsOptions} from 'cors';
import path from 'path';

const app = express();
const port = 8000;

const whitelist = ['http://localhost:8000', 'http://localhost:5173'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/fixtures', express.static(path.join(__dirname, 'public/fixtures')));
app.use('/', artistsRouter);
app.use('/', albumsRouter);
app.use('/', tracksRouter);
app.use('/', usersRouter);
app.use('/', trackHistoryRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/spotify');

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);