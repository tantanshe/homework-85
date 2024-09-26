import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [artistOne, artistTwo, artistThree] = await Artist.create(
    {
      name: 'SHINee',
      photo: 'fixtures/shinee.jpg',
      info: '-',
      isPublished: true,
    },
    {
      name: 'EXO',
      photo: 'fixtures/exo.jpeg',
      info: '-',
      isPublished: true,
    },
    {
      name: 'Day6',
      photo: 'fixtures/day6.jpeg',
      info: '-',
      isPublished: false,
    },
  );

  const [albumOneArtistOne, albumTwoArtistOne, albumOneArtistTwo, albumTwoArtistTwo, albumOneArtistThree] = await Album.create(
    {
      name: 'Odd',
      photo: 'fixtures/odd.jpeg',
      year: 2015,
      artist: artistOne._id,
      isPublished: true,
    },
    {
      name: 'The Misconceptions of Us',
      photo: 'fixtures/the-misconceptions-of-us.png',
      year: 2013,
      artist: artistOne._id,
      isPublished: true,
    },
    {
      name: 'Exodus',
      photo: 'fixtures/exodus.png',
      year: 2015,
      artist: artistTwo._id,
      isPublished: true,
    },
    {
      name: 'Exist',
      photo: 'fixtures/exist.jpeg',
      year: 2023,
      artist: artistTwo._id,
      isPublished: true,
    },
    {
      name: 'Band Aid',
      photo: 'fixtures/band-aid.jpeg',
      year: 2024,
      artist: artistThree._id,
      isPublished: false,
    }
  );
  await Track.create(
    ...[
      {name: 'Odd Eye', duration: '3:21', trackNumber: 1, album: albumOneArtistOne._id, isPublished: true},
      {name: 'View', duration: '3:45', trackNumber: 2, album: albumOneArtistOne._id, isPublished: true},
      {name: 'Trigger', duration: '3:50', trackNumber: 3, album: albumOneArtistOne._id, isPublished: true},
      {name: 'Romance', duration: '3:36', trackNumber: 4, album: albumOneArtistOne._id, isPublished: true},
      {name: 'An Ode To You', duration: '4:18', trackNumber: 5, album: albumOneArtistOne._id, isPublished: true},
    ],
    ...[
      {name: 'Dream Girl', duration: '3:01', trackNumber: 1, album: albumTwoArtistOne._id, isPublished: true},
      {name: 'Why So Serious?', duration: '3:35', trackNumber: 2, album: albumTwoArtistOne._id, isPublished: true},
      {name: 'Symptoms', duration: '3:50', trackNumber: 3, album: albumTwoArtistOne._id, isPublished: true},
      {name: 'Runaway', duration: '3:11', trackNumber: 4, album: albumTwoArtistOne._id, isPublished: true},
      {name: 'Spoiler', duration: '3:25', trackNumber: 5, album: albumTwoArtistOne._id, isPublished: true},
    ],
    ...[
      {name: 'Call Me Baby', duration: '3:30', trackNumber: 1, album: albumOneArtistTwo._id, isPublished: true},
      {name: 'Transformer', duration: '3:45', trackNumber: 2, album: albumOneArtistTwo._id, isPublished: true},
      {name: 'My Answer', duration: '4:05', trackNumber: 3, album: albumOneArtistTwo._id, isPublished: true},
      {name: 'What If...', duration: '3:50', trackNumber: 4, album: albumOneArtistTwo._id, isPublished: true},
      {name: 'El Dorado', duration: '4:15', trackNumber: 5, album: albumOneArtistTwo._id, isPublished: true},
    ],
    ...[
      {name: 'Cream Soda', duration: '3:20', trackNumber: 1, album: albumTwoArtistTwo._id, isPublished: true},
      {name: 'Love Fool', duration: '3:35', trackNumber: 2, album: albumTwoArtistTwo._id, isPublished: true},
      {name: 'Regret It', duration: '2:56', trackNumber: 3, album: albumTwoArtistTwo._id, isPublished: true},
      {name: 'Let Me In', duration: '3:18', trackNumber: 4, album: albumTwoArtistTwo._id, isPublished: true},
      {name: 'Hear Me Out', duration: '3:25', trackNumber: 5, album: albumTwoArtistTwo._id, isPublished: true}
    ],
    ...[
      {name: 'Monster', duration: '3:36', trackNumber: 1, album: albumOneArtistThree._id, isPublished: false},
      {name: 'Melt Down', duration: '2:45', trackNumber: 2, album: albumOneArtistThree._id, isPublished: false},
      {name: 'She Smiled', duration: '3:22', trackNumber: 3, album: albumOneArtistThree._id, isPublished: false},
    ]
  );
  await User.create({
    username: 'user',
    password: '1@345qWert',
    token: crypto.randomUUID(),
    role: 'user'
  }, {
    username: 'admin',
    password: '1@345qWert',
    token: crypto.randomUUID(),
    role: 'admin'
  });

  await db.close();
};

run().catch(console.error);