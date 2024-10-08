import mongoose, {Types} from 'mongoose';
import Artist from './Artist';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    }
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;