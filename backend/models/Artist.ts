import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  info: {
    type: String,
  }
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;