import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [artistOne, artistTwo] = await Artist.create(
    {
      name: 'SHINee',
      photo: 'fixtures/shinee.jpg',
      info: '-',
    },
    {
      name: 'EXO',
      photo: 'fixtures/exo.jpeg',
      info: '-',
    }
  );

  const [albumOneArtistOne, albumTwoArtistOne, albumOneArtistTwo, albumTwoArtistTwo] = await Album.create(
    {
      name: 'Odd',
      photo: 'fixtures/odd.jpeg',
      year: 2015,
      artist: artistOne._id,
    },
    {
      name: 'The Misconceptions of Us',
      photo: 'fixtures/the-misconceptions-of-us.png',
      year: 2013,
      artist: artistOne._id,
    },
    {
      name: 'Exodus',
      photo: 'fixtures/exodus.png',
      year: 2015,
      artist: artistTwo._id,
    },
    {
      name: 'Exist',
      photo: 'fixtures/exist.jpeg',
      year: 2023,
      artist: artistTwo._id,
    }
  );
  await Track.create(
    ...[
      {name: 'Odd Eye', duration: '3:21', trackNumber: 1, album: albumOneArtistOne._id},
      {name: 'View', duration: '3:45', trackNumber: 2, album: albumOneArtistOne._id},
      {name: 'Trigger', duration: '3:50', trackNumber: 3, album: albumOneArtistOne._id},
      {name: 'Romance', duration: '3:36', trackNumber: 4, album: albumOneArtistOne._id},
      {name: 'An Ode To You', duration: '4:18', trackNumber: 5, album: albumOneArtistOne._id},
    ],
    ...[
      {name: 'Dream Girl', duration: '3:01', trackNumber: 1, album: albumTwoArtistOne._id},
      {name: 'Why So Serious?', duration: '3:35', trackNumber: 2, album: albumTwoArtistOne._id},
      {name: 'Symptoms', duration: '3:50', trackNumber: 3, album: albumTwoArtistOne._id},
      {name: 'Runaway', duration: '3:11', trackNumber: 4, album: albumTwoArtistOne._id},
      {name: 'Spoiler', duration: '3:25', trackNumber: 5, album: albumTwoArtistOne._id},
    ],
    ...[
      {name: 'Call Me Baby', duration: '3:30', trackNumber: 1, album: albumOneArtistTwo._id},
      {name: 'Transformer', duration: '3:45', trackNumber: 2, album: albumOneArtistTwo._id},
      {name: 'My Answer', duration: '4:05', trackNumber: 3, album: albumOneArtistTwo._id},
      {name: 'What If...', duration: '3:50', trackNumber: 4, album: albumOneArtistTwo._id},
      {name: 'El Dorado', duration: '4:15', trackNumber: 5, album: albumOneArtistTwo._id},
    ],
    ...[
      {name: 'Cream Soda', duration: '3:20', trackNumber: 1, album: albumTwoArtistTwo._id},
      {name: 'Love Fool', duration: '3:35', trackNumber: 2, album: albumTwoArtistTwo._id},
      {name: 'Regret It', duration: '2:56', trackNumber: 3, album: albumTwoArtistTwo._id},
      {name: 'Let Me In', duration: '3:18', trackNumber: 4, album: albumTwoArtistTwo._id},
      {name: 'Hear Me Out', duration: '3:25', trackNumber: 5, album: albumTwoArtistTwo._id}
    ]
  );

  await db.close();
};

run().catch(console.error);