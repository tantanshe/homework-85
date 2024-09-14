export interface Artist {
  _id: string;
  name: string;
  photo: string;
}

export interface Album {
  _id: string;
  artistId: string;
  name: string;
  photo: string;
  year: number;
}

export interface Track {
  _id: string;
  albumId: string;
  trackNumber: number;
  name: string;
  duration: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackInHistory {
  _id: string;
  track: {
    name: string;
    album: {
      artist: { name: string };
    };
  };
  datetime: string;
}